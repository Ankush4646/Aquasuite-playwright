import { chromium } from '@playwright/test';
import { randomEmail } from '../utils/randomData';

const tenantAdminCredential = {
  email: process.env.TENANT_ADMIN_EMAIL || 'tenant-admin@aquasuite.test',
  password: process.env.TENANT_ADMIN_PASSWORD || 'Password123!',
};

const invitedUser = {
  name: 'Invited User',
  email: process.env.INVITED_USER_EMAIL || randomEmail('aquasuite.test'),
  password: process.env.INVITED_USER_PASSWORD || 'Welcome@123',
};

async function runTenantInviteFlow() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // 1. Tenant admin signs in
  await page.goto(process.env.BASE_URL || 'https://app.aquasuite.example/login');
  await page.getByLabel(/username|email/i).fill(tenantAdminCredential.email);
  await page.getByLabel(/password/i).fill(tenantAdminCredential.password);
  await page.getByRole('button', { name: /log in|sign in/i }).click();

  await page.waitForURL(/.*(dashboard|home|overview)/i, { timeout: 30000 });

  // 2. Invite user from team page
  await page.goto(process.env.BASE_URL || 'https://app.aquasuite.example' + '/team');
  await page.getByRole('button', { name: /invite user|add member|new member/i }).click();
  await page.getByLabel(/email/i).fill(invitedUser.email);
  await page.getByRole('button', { name: /send invite|invite/i }).click();

  await page.getByText(/invited|sent|success/i).waitFor({ timeout: 20000 });

  // 3. Simulate reading the Outlook invite link from email template / env
  const inviteLink = process.env.INVITE_URL || 'https://app.aquasuite.example/invite/accept?token=demo-token';

  // 4. Invited user lands on invite acceptance page
  const invitedUserPage = await browser.newPage();
  await invitedUserPage.goto(inviteLink);

  const acceptButton = invitedUserPage.getByRole('button', { name: /accept invite|accept invitation|join now|get started/i });
  const continueButton = invitedUserPage.getByRole('button', { name: /continue|next/i });

  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  } else if (await continueButton.isVisible().catch(() => false)) {
    await continueButton.click();
  }

  // 5. Create and confirm password
  await invitedUserPage.getByLabel(/create password|new password|password/i).fill(invitedUser.password);
  await invitedUserPage.getByLabel(/confirm password|repeat password/i).fill(invitedUser.password);
  await invitedUserPage.getByRole('button', { name: /create account|continue|save password|set password/i }).click();

  await invitedUserPage.waitForURL(/.*(dashboard|home|welcome|setup)/i, { timeout: 30000 });

  console.log(`Invitation sent to ${invitedUser.email}`);
  console.log(`Invite accepted and password set for ${invitedUser.email}`);

  await browser.close();
}

runTenantInviteFlow();

import { chromium } from '@playwright/test';
import { testData } from '../utils/testData';

async function runInviteAcceptanceFlow() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(testData.inviteUser.inviteUrl);

  const acceptButton = page.getByRole('button', { name: /accept invite|accept invitation|join now|get started/i });
  const continueButton = page.getByRole('button', { name: /continue|next/i });

  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  } else if (await continueButton.isVisible().catch(() => false)) {
    await continueButton.click();
  }

  await page.getByLabel(/create password|new password|password/i).fill(testData.inviteUser.password);
  await page.getByLabel(/confirm password|repeat password/i).fill(testData.inviteUser.confirmPassword);
  await page.getByRole('button', { name: /create account|continue|save password|set password/i }).click();

  await page.waitForURL(/.*(dashboard|home|welcome|setup)/i, { timeout: 30000 });
  console.log('Invite accepted and password created successfully.');

  await browser.close();
}

runInviteAcceptanceFlow();

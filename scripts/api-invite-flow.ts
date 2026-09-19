import { chromium, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'https://app.aquasuite.example';
const inviteEndpoint = process.env.INVITE_API_URL || `${baseUrl}/api/v1/team/invite`;
const loginEndpoint = process.env.LOGIN_API_URL || `${baseUrl}/api/v1/auth/login`;
const authToken = process.env.API_AUTH_TOKEN;

const tenantAdmin = {
  email: process.env.TENANT_ADMIN_EMAIL || 'tenant-admin@aquasuite.test',
  password: process.env.TENANT_ADMIN_PASSWORD || 'Password123!',
};

const invitedUser = {
  fullName: process.env.INVITED_USER_NAME || 'Invited User',
  email: process.env.INVITED_USER_EMAIL || 'invited-user@aquasuite.test',
  password: process.env.INVITED_USER_PASSWORD || 'Welcome@123',
};

function extractInviteUrl(payload: any): string | undefined {
  return (
    payload?.inviteUrl ||
    payload?.data?.inviteUrl ||
    payload?.result?.inviteUrl ||
    payload?.url ||
    payload?.data?.url ||
    payload?.result?.url ||
    payload?.invitation?.inviteUrl ||
    payload?.invitation?.url
  );
}

async function getAuthToken(): Promise<string | undefined> {
  if (authToken) return authToken;

  const loginResponse = await fetch(loginEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: tenantAdmin.email,
      password: tenantAdmin.password,
    }),
  });

  const loginData = await loginResponse.json();

  if (!loginResponse.ok) {
    console.warn('Login endpoint not available or auth is not required. Continuing without auth header.');
    return undefined;
  }

  return loginData?.token || loginData?.accessToken || loginData?.data?.token || loginData?.data?.accessToken;
}

async function inviteUserViaApi() {
  const token = await getAuthToken();

  const response = await fetch(inviteEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      email: invitedUser.email,
      fullName: invitedUser.fullName,
      role: 'team_member',
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`Invite API failed: ${JSON.stringify(payload)}`);
  }

  const inviteUrl = extractInviteUrl(payload);

  if (!inviteUrl) {
    throw new Error(`Invite response did not contain inviteUrl. Response: ${JSON.stringify(payload)}`);
  }

  return inviteUrl;
}

async function acceptInvite(inviteUrl: string) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(inviteUrl);

  const acceptButton = page.getByRole('button', { name: /accept invite|accept invitation|join now|get started/i });
  const continueButton = page.getByRole('button', { name: /continue|next/i });

  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  } else if (await continueButton.isVisible().catch(() => false)) {
    await continueButton.click();
  }

  await page.getByLabel(/create password|new password|password/i).fill(invitedUser.password);
  await page.getByLabel(/confirm password|repeat password/i).fill(invitedUser.password);
  await page.getByRole('button', { name: /create account|continue|save password|set password/i }).click();

  await expect(page).toHaveURL(/.*(dashboard|home|welcome|setup)/i, { timeout: 30000 });

  console.log(`Invite accepted successfully via API-provided URL: ${inviteUrl}`);
  await browser.close();
}

async function main() {
  const inviteUrl = await inviteUserViaApi();
  await acceptInvite(inviteUrl);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

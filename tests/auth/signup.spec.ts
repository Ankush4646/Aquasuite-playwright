import { test, expect } from '@playwright/test';

test.describe('Auth - signup', () => {
  test('tenant admin can sign up and start free trial', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel(/full name|name/i).fill('Tenant Admin');
    await page.getByLabel(/email|work email/i).fill(`tenantadmin${Date.now()}@example.com`);
    await page.getByLabel(/password/i).fill('Password123!');
    await page.getByLabel(/company|tenant name|organization/i).fill('AquaSuite Demo Tenant');
    await page.getByRole('button', { name: /sign up|create account|get started|join now/i }).click();

    await expect(page.getByText(/free trial|trial/i)).toBeVisible();
    await page.getByRole('button', { name: /start free trial|get free trial|activate trial|claim trial/i }).click();

    await expect(page).toHaveURL(/.*(dashboard|home|overview)/i);
  });
});

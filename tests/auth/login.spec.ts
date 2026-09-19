import { test, expect } from '@playwright/test';

test.describe('Auth - login', () => {
  test('user can log in', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/username|email/i).fill(process.env.USERNAME || 'admin@example.com');
    await page.getByLabel(/password/i).fill(process.env.PASSWORD || 'Password123!');
    await page.getByRole('button', { name: /log in|sign in/i }).click();

    await expect(page).toHaveURL(/.*(dashboard|home|overview)/i);
  });
});

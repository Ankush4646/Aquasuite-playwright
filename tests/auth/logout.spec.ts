import { test, expect } from '@playwright/test';

test.describe('Auth - logout', () => {
  test('user can log out', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/username|email/i).fill(process.env.USERNAME || 'admin@example.com');
    await page.getByLabel(/password/i).fill(process.env.PASSWORD || 'Password123!');
    await page.getByRole('button', { name: /log in|sign in/i }).click();

    await page.getByRole('button', { name: /logout|sign out/i }).click();
    await expect(page).toHaveURL(/.*(login|signin)/i);
  });
});

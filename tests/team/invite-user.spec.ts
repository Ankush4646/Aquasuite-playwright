import { test, expect } from '@playwright/test';

test.describe('Team - invite user', () => {
  test('admin can invite a team member', async ({ page }) => {
    await page.goto('/team');
    await page.getByRole('button', { name: /invite user|add member/i }).click();
    await page.getByLabel(/email/i).fill(`member${Date.now()}@example.com`);
    await page.getByRole('button', { name: /send invite/i }).click();
    await expect(page.getByText(/invited|sent/i)).toBeVisible();
  });
});

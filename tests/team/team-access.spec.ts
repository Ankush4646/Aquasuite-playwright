import { test, expect } from '@playwright/test';

test.describe('Team - access', () => {
  test('team access page loads', async ({ page }) => {
    await page.goto('/team');
    await expect(page.getByText(/team|members|roles/i)).toBeVisible();
  });
});

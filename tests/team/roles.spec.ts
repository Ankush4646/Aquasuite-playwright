import { test, expect } from '@playwright/test';

test.describe('Team - roles', () => {
  test('role permissions are displayed', async ({ page }) => {
    await page.goto('/team/roles');
    await expect(page.getByText(/admin|viewer|editor|role/i)).toBeVisible();
  });
});

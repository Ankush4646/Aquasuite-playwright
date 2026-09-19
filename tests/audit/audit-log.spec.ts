import { test, expect } from '@playwright/test';

test.describe('Audit - audit log', () => {
  test('audit log page loads', async ({ page }) => {
    await page.goto('/audit');
    await expect(page.getByText(/audit|activity|logs/i)).toBeVisible();
  });
});

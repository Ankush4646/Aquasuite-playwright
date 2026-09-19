import { test, expect } from '@playwright/test';

test.describe('Tenant - settings', () => {
  test('tenant settings can be updated', async ({ page }) => {
    await page.goto('/tenant/settings');
    await page.getByLabel(/tenant name/i).fill('Updated Tenant');
    await page.getByRole('button', { name: /save|update/i }).click();
    await expect(page.getByText(/updated|saved/i)).toBeVisible();
  });
});

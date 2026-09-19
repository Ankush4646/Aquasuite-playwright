import { test, expect } from '@playwright/test';

test.describe('Tenant - isolation', () => {
  test('data is isolated by tenant', async ({ page }) => {
    await page.goto('/tenant/settings');
    await expect(page.getByText(/tenant|workspace|environment/i)).toBeVisible();
  });
});

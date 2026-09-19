import { test, expect } from '@playwright/test';

test.describe('Tenant - creation', () => {
  test('admin can create a tenant', async ({ page }) => {
    await page.goto('/tenant/new');
    await page.getByLabel(/tenant name/i).fill('New Tenant');
    await page.getByRole('button', { name: /create tenant|save/i }).click();
    await expect(page.getByText(/tenant created|success/i)).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Billing - invoices', () => {
  test('invoices page loads', async ({ page }) => {
    await page.goto('/billing/invoices');
    await expect(page.getByText(/invoice|billing/i)).toBeVisible();
  });
});

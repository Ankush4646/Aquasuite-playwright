import { test, expect } from '@playwright/test';

test.describe('Billing - billing', () => {
  test('billing and invoices page loads', async ({ page }) => {
    await page.goto('/billing/invoices');

    await expect(page.getByRole('heading', { name: /billing & invoices/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /billing/i })).toBeVisible();
    await expect(page.getByText(/INV-/i).first()).toBeVisible();
  });
});

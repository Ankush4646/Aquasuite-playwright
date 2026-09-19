import { test, expect } from '@playwright/test';

test.describe('Subscription - trial expiry', () => {
  test('trial expiry state is shown to user', async ({ page }) => {
    await page.goto('/subscription');
    await expect(page.getByText(/expired|trial ends|billing/i)).toBeVisible();
  });
});

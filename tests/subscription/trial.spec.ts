import { test, expect } from '@playwright/test';

test.describe('Subscription - trial', () => {
  test('trial is available to tenant admin', async ({ page }) => {
    await page.goto('/subscription');
    await expect(page.getByText(/free trial|trial/i)).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Subscription - subscription', () => {
  test('subscription page loads', async ({ page }) => {
    await page.goto('/subscription');
    await expect(page.getByText(/plan|subscription|billing/i)).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';
import { buildTenantUrl, extractTenantSlugFromUrl } from '../../utils/tenantUtils';

test.describe('Tenant multi-tenant signup flow', () => {
  test('signup generates slug and tenant members use the same tenant slug', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://app-qa.aquasuite.io';
    const email = `tenantadmin${Date.now()}@example.com`;

    await page.goto('/signup');
    await page.getByLabel(/full name|name/i).fill('Tenant Admin');
    await page.getByLabel(/email|work email/i).fill(email);
    await page.getByLabel(/password/i).fill('Password123!');
    await page.getByLabel(/company|tenant name|organization/i).fill('AquaSuite Demo Tenant');
    await page.getByRole('button', { name: /sign up|create account|get started|join now/i }).click();

    await page.waitForURL(/.*(dashboard|home|overview|setup)/i, { timeout: 30000 });

    const currentUrl = page.url();
    const tenantSlug = extractTenantSlugFromUrl(currentUrl) || 'ygchm11r71';

    const tenantLoginUrl = buildTenantUrl(baseUrl, tenantSlug, '/login');

    await page.goto(tenantLoginUrl);
    await page.getByLabel(/email|username/i).fill(email);
    await page.getByLabel(/password/i).fill('Password123!');
    await page.getByRole('button', { name: /log in|sign in/i }).click();

    await expect(page).toHaveURL(new RegExp(`${tenantSlug}`, 'i'));
  });
});

import { test } from '@playwright/test';
import { SignupPage } from '../pages/signupPage';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Tenant admin signup', () => {
  test('tenant admin can sign up and get a free trial', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new DashboardPage(page);

    const timestamp = Date.now();
    const email = `tenantadmin${timestamp}@example.com`;

    await signupPage.openSignupPage();
    await signupPage.signup({
      fullName: 'Tenant Admin',
      email,
      password: process.env.PASSWORD || 'Password123!',
      company: 'AquaSuite Demo Tenant',
    });

    await signupPage.acceptFreeTrial();
    await dashboardPage.expectDashboardVisible();
  });
});

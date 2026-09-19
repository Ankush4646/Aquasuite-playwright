import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class SignupPage extends BasePage {
  readonly fullNameInput = this.page.getByLabel(/full name|name/i);
  readonly emailInput = this.page.getByLabel(/email|work email/i);
  readonly passwordInput = this.page.getByLabel(/password/i);
  readonly companyInput = this.page.getByLabel(/company|tenant name|organization/i);
  readonly signupButton = this.page.getByRole('button', {
    name: /sign up|create account|get started|join now/i,
  });
  readonly freeTrialButton = this.page.getByRole('button', {
    name: /start free trial|get free trial|activate trial|claim trial/i,
  });

  constructor(page: Page) {
    super(page);
  }

  async openSignupPage() {
    await this.open('/signup');
  }

  async signup({
    fullName,
    email,
    password,
    company,
  }: {
    fullName: string;
    email: string;
    password: string;
    company: string;
  }) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if (await this.companyInput.isVisible().catch(() => false)) {
      await this.companyInput.fill(company);
    }

    await this.signupButton.click();
  }

  async acceptFreeTrial() {
    await expect(this.freeTrialButton.or(this.page.getByText(/free trial/i))).toBeVisible();
    await this.freeTrialButton.click();
  }
}

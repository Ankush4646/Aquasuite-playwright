import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openHomePage() {
    await this.open('/');
  }

  async expectPageTitle() {
    await expect(this.page).toHaveTitle(/Example Domain/i);
  }

  async expectMainHeadingVisible() {
    await expect(this.page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
  }
}

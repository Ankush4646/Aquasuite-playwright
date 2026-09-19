import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = '/') {
    await this.page.goto(path);
  }

  async waitForPageToLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

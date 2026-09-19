import { expect, Page } from '@playwright/test';

export class InvoicePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/billing/invoices');
  }

  async expectInvoicesVisible() {
    await expect(this.page.getByText(/invoice|billing/i)).toBeVisible();
  }
}

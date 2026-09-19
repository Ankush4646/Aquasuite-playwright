import { expect, Page } from '@playwright/test';

export class TeamAccessPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/team');
  }

  async expectTeamVisible() {
    await expect(this.page.getByText(/team|members|roles/i)).toBeVisible();
  }
}

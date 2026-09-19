import { expect, Page } from '@playwright/test';

export class InviteAcceptancePage {
  constructor(private readonly page: Page) {}

  async openInviteLink(link: string) {
    await this.page.goto(link);
  }

  async acceptInvitation() {
    const acceptButton = this.page.getByRole('button', { name: /accept invite|accept invitation|join now|get started/i });
    const continueButton = this.page.getByRole('button', { name: /continue|next/i });

    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click();
    } else if (await continueButton.isVisible().catch(() => false)) {
      await continueButton.click();
    }
  }

  async createPassword(password: string, confirmPassword = password) {
    const passwordField = this.page.getByLabel(/create password|new password|password/i);
    const confirmField = this.page.getByLabel(/confirm password|repeat password/i);

    await expect(passwordField).toBeVisible();
    await passwordField.fill(password);
    await confirmField.fill(confirmPassword);

    await this.page.getByRole('button', { name: /create account|continue|save password|set password/i }).click();
  }

  async expectAccountReady() {
    await expect(this.page).toHaveURL(/.*(dashboard|home|welcome|setup)/i);
  }
}

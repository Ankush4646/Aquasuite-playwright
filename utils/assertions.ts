import { expect, Page } from '@playwright/test';

export async function expectText(page: Page, text: string | RegExp) {
  await expect(page.getByText(text)).toBeVisible();
}

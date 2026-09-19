import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('AquaSuite smoke tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.openHomePage();
    await homePage.expectPageTitle();
    await homePage.expectMainHeadingVisible();
  });
});

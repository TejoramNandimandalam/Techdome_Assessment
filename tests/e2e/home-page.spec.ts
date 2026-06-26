import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page Tests', () => {

  test('Verify home page loads successfully', async ({ page }) => {

    // Create HomePage object
    const homePage = new HomePage(page);

    // Navigate to home page
    await homePage.navigateToHomePage();

    await page.waitForTimeout(2000);

    // Verify page loaded successfully
    await homePage.verifyHomePageLoaded();

  });

});
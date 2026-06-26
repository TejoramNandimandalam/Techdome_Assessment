import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page Element Tests', () => {

  test('Verify Contact Us button is visible', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();

    await expect(homePage.contactUsButton()).toBeVisible();

  });

  test('Verify Contact Us button navigates to Contact page', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();

    await homePage.clickContactUs();

    await page.waitForTimeout(3000)

    await expect(page).toHaveURL(/contact-us/);

  });

  test('Verify main CTA buttons are visible', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();

    await page.waitForTimeout(3000)

    await expect(homePage.meetTheMindsButton()).toBeVisible();
    await expect(homePage.expandYourKnowledgeButton()).toBeVisible();
    await expect(homePage.exploreMoreButton()).toBeVisible();

  });

});
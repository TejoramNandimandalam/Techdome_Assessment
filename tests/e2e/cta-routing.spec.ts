import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('CTA Routing Tests', () => {

    test('Verify Expand Your Knowledge CTA routes to Contact page',
        async ({ page }) => {

            const homePage = new HomePage(page);

            await homePage.navigateToHomePage();

            await page.waitForTimeout(3000);

            await homePage.expandYourKnowledgeButton().click();

            await page.waitForTimeout(3000);

            await expect(page).toHaveURL(/contact-us/);
        });

    test('Verify Explore More CTA routes to About Us page',
        async ({ page }) => {

            const homePage = new HomePage(page);

            await homePage.navigateToHomePage();

            await page.waitForTimeout(3000);

            await homePage.exploreMoreButton().click();

            await page.waitForTimeout(3000);

            await expect(page).toHaveURL(/about-us/);
        });

});

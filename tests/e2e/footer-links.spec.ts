import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Footer Navigation Link Tests', () => {

    test('Verify footer navigation links are present with valid hrefs',
        async ({ page }) => {

            await page.goto(baseURL, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            // Scroll to footer
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });

            await page.waitForTimeout(2000);

            const footerLinks = page.locator('footer a');

            const count = await footerLinks.count();

            console.log('Footer link count:', count);

            expect(count).toBeGreaterThan(0);

            // Verify key footer links exist with valid hrefs
            const expectedLinks = [
                'About Us',
                'Careers',
                'Privacy Policy',
                'Terms of use'
            ];

            for (const linkName of expectedLinks) {

                await expect(
                    page.locator('footer a', { hasText: linkName }).first()
                ).toHaveAttribute('href', /.+/);
            }
        });

    test('Verify footer About Us link navigates correctly',
        async ({ page }) => {

            await page.goto(baseURL, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });

            await page.waitForTimeout(2000);

            await page.locator('footer a', {
                hasText: 'About Us'
            }).first().click();

            await page.waitForTimeout(3000);

            await expect(page).toHaveURL(/about-us/);
        });

});

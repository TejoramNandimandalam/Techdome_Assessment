import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Mobile Responsiveness Tests', () => {

    test('Verify website responsiveness on 375px viewport',
        async ({ page }) => {

            await page.setViewportSize({
                width: 375,
                height: 812
            });

            await page.goto(baseURL);

            // Verify mobile menu (nav collapse)
            const mobileMenu = page.getByRole('img', { name: 'Menu' });

            await expect(mobileMenu).toBeVisible();

            console.log('Mobile navigation collapsed successfully');

            // Verify page content is visible
            await expect(page.locator('body')).toBeVisible();

            await page.waitForTimeout(2000)

            // Verify no horizontal overflow
            const hasHorizontalOverflow = await page.evaluate(() =>
                document.documentElement.scrollWidth > window.innerWidth
            );

            expect(hasHorizontalOverflow).toBeFalsy();
        });

    test('Verify website responsiveness on 768px viewport',
        async ({ page }) => {

            await page.setViewportSize({
                width: 768,
                height: 1024
            });

            await page.goto(baseURL);

            // Verify content is visible
            await expect(page.locator('body')).toBeVisible();

            await page.waitForTimeout(2000)

            // Verify no horizontal overflow
            const hasHorizontalOverflow = await page.evaluate(() =>
                document.documentElement.scrollWidth > window.innerWidth
            );

            expect(hasHorizontalOverflow).toBeFalsy();


        });

});
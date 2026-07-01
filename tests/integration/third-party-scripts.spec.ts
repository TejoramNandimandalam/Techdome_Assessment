import { test, expect } from '@playwright/test';
import { baseURL, HomePage } from '../../pages/HomePage';

test.describe('Third Party Script Tests', () => {

    test('Verify Google Analytics script loads successfully',
        async ({ page }) => {

            const analyticsRequests: string[] = [];

            page.on('request', request => {

                if (
                    request.url().includes('google-analytics') ||
                    request.url().includes('google.com/g/collect')
                ) {

                    analyticsRequests.push(request.url());

                    console.log(
                        'Analytics Request:',
                        request.url()
                    );
                }
            });

            const homePage = new HomePage(page);
            await page.goto(baseURL)
            await page.waitForTimeout(3000)

            // Verify page loaded successfully
            await homePage.verifyHomePageLoaded();

            expect(
                analyticsRequests.length
            ).toBeGreaterThan(0);
        });

});
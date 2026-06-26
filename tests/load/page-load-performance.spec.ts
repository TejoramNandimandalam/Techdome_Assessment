import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Performance Tests', () => {

    test('Verify homepage performance metrics',
        async ({ page }) => {

            const startTime = Date.now();

           await page.goto(baseURL)

            await page.waitForLoadState('load');

            const loadTime =
                (Date.now() - startTime) / 1000;

            console.log(
                `Homepage Load Time: ${loadTime} seconds`
            );

            // Record performance information

            expect(loadTime).toBeLessThan(10);
        });
});
import { test, expect, Browser } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Load Tests', () => {

    test('Verify 5 concurrent users with no 5xx errors',
        async ({ browser }) => {

            test.fail(
                true,
                'Known issue: site breaches 5-user load SLA (BUG-006)'
            );

            test.setTimeout(120000);

            const loadTimes: number[] = [];
            let serverErrors = 0;

            const userPromises = Array.from({ length: 5 }).map(
                async (_, index) => {

                    const context = await browser.newContext();
                    const page = await context.newPage();

                    page.on('response', response => {

                        if (response.status() >= 500) {

                            serverErrors++;

                            console.log(
                                `User ${index + 1}: Server Error ->`,
                                response.status(),
                                response.url()
                            );
                        }
                    });

                    const startTime = Date.now();

                    await page.goto(baseURL)
                    await page.waitForTimeout(3000);

                    const loadTime =
                        (Date.now() - startTime) / 1000;

                    console.log(
                        `User ${index + 1} Load Time: ${loadTime}s`
                    );

                    loadTimes.push(loadTime);

                    await context.close();
                }
            );

            await Promise.all(userPromises);

            // Sort load times

            loadTimes.sort((a, b) => a - b);

            console.log('All Load Times:', loadTimes);

            // Approximate p95

            const p95Index =
                Math.ceil(loadTimes.length * 0.95) - 1;

            const p95 = loadTimes[p95Index];

            console.log(`P95 Load Time: ${p95}s`);

            expect(p95).toBeLessThan(3);

            expect(serverErrors).toBe(0);
        });

});
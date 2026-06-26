import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Render Blocking Script Tests', () => {

    test('Verify third-party scripts load without blocking render',
        async ({ page }) => {

            await page.goto(baseURL)
            await page.waitForTimeout(3000)

            // Collect third-party (analytics / tag manager) scripts
            const thirdPartyScripts = await page.$$eval(
                'script[src]',
                elements => elements
                    .filter(el => /googletagmanager|google-analytics|gtag|gtm/i
                        .test(el.getAttribute('src') || ''))
                    .map(el => ({
                        src: el.getAttribute('src'),
                        async: (el as HTMLScriptElement).async,
                        defer: (el as HTMLScriptElement).defer
                    }))
            );

            console.log(
                'Third-party scripts:',
                JSON.stringify(thirdPartyScripts)
            );

            expect(thirdPartyScripts.length).toBeGreaterThan(0);

            // Each third-party script must be async or defer (non blocking)
            for (const script of thirdPartyScripts) {

                expect(script.async || script.defer).toBeTruthy();
            }
        });

});

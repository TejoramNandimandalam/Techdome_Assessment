import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Sensitive Data Exposure Tests', () => {

    test('Verify no sensitive information is exposed in page source',
        async ({ page }) => {

           await page.goto(baseURL)
           await page.waitForTimeout(3000)

            const htmlContent = await page.content();

            // Common API key/token patterns

            expect(htmlContent).not.toContain('AIza');
            expect(htmlContent).not.toContain('Bearer');
            expect(htmlContent).not.toContain('SECRET_KEY');
            expect(htmlContent).not.toContain('API_KEY');

            console.log('No sensitive data exposed.');
        });
});
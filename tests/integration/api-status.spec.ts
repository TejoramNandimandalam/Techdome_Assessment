import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('API Status Tests', () => {

    test('Verify homepage endpoint returns HTTP 200',
        async ({ page }) => {

            const response = await page.goto(
                baseURL,
                {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });

            console.log(
                'Homepage Status Code:',
                response?.status()
            );

            expect(response?.status()).toBe(200);
        });

    test('Verify contact page endpoint returns HTTP 200',
        async ({ page }) => {

            const response = await page.goto(
                'https://techdome.io/contact-us/',
                {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });

            console.log(
                'Contact Page Status Code:',
                response?.status()
            );

            expect(response?.status()).toBe(200);
        });

});
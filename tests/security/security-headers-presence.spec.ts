import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Security Header Presence Tests', () => {

    test('Verify critical security headers are present',
        async ({ request }) => {

            test.fail(
                true,
                'Known issue: critical security headers are missing (BUG-005)'
            );

            const response = await request.get(baseURL);

            const headers = response.headers();

            console.log('X-Frame-Options:', headers['x-frame-options']);
            console.log('Content-Security-Policy:', headers['content-security-policy']);
            console.log('Strict-Transport-Security:', headers['strict-transport-security']);

            // Assert presence of critical security headers
            expect(
                headers['x-frame-options'],
                'X-Frame-Options header should be present'
            ).toBeTruthy();

            expect(
                headers['content-security-policy'],
                'Content-Security-Policy header should be present'
            ).toBeTruthy();

            expect(
                headers['strict-transport-security'],
                'Strict-Transport-Security header should be present'
            ).toBeTruthy();
        });

});

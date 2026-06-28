import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';

test.describe('XSS Validation Tests', () => {

    test('Verify XSS payload is sanitised or rejected in form flow',
        async ({ page }) => {

            const contactPage = new ContactPage(page);

            await contactPage.navigateToContactPage();

            const xssPayload = '<script>alert(1)</script>';

            await contactPage.fillContactForm(
                'Infosys',
                xssPayload,
                'Kumar',
                'rakesh@gmail.com',
                'Hello I am rakesh',
            );

            await contactPage.clickSendMessage();

            // Verify no JavaScript alert appeared
            let alertTriggered = false;

            page.on('dialog', async dialog => {

                alertTriggered = true;

                await dialog.dismiss();
            });

            await page.waitForTimeout(3000);

            // Payload must not execute and must not be reflected unsafely.
            expect(alertTriggered).toBeFalsy();
            await expect(page.locator('body')).not.toContainText(xssPayload);
        })
})
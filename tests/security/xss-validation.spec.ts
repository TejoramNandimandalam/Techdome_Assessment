import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';

test.describe('XSS Validation Tests', () => {

    test('Verify application handles XSS input safely',
        async ({ page }) => {

            const contactPage = new ContactPage(page);

            await contactPage.navigateToContactPage();

            const xssPayload = '<script>alert("XSS")</script>';

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

            expect(alertTriggered).toBeFalsy();
        });
});
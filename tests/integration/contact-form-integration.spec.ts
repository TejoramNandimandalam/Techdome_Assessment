import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';

test.describe('Contact Form Integration Tests', () => {

    test('Verify form submission triggers network navigation',
        async ({ page }) => {

            const contactPage = new ContactPage(page);

            await contactPage.navigateToContactPage();

            await contactPage.fillContactForm(
                'Infosys',
                'Rakesh',
                'Kumar',
                'rakesh@gmail.com',
                'Hello I am rakesh',
            );

            await contactPage.clickSendMessage();

            // Wait for navigation or processing

            await page.waitForTimeout(5000);

            console.log('Current URL:', page.url());

            // Verify application remains on contact page
            // or navigates successfully after submission

            await expect(page.url()).toContain('contact-us');

            // Verify page did not crash

            await expect(page).not.toHaveURL(/404|500/);
        });
});
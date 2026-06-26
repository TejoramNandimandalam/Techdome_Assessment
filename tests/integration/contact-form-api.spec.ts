import { test } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';

test('Discover Contact Form API', async ({ page }) => {

    const contactPage = new ContactPage(page);

    // Capture XHR/Fetch requests only
    page.on('request', request => {

        const resourceType = request.resourceType();

        if (resourceType === 'xhr' || resourceType === 'fetch') {

            console.log('================================');
            console.log('METHOD :', request.method());
            console.log('TYPE   :', resourceType);
            console.log('URL    :', request.url());
            console.log('================================');
        }
    });

    // Capture XHR/Fetch responses only
    page.on('response', response => {

        const request = response.request();

        if (
            request.resourceType() === 'xhr' ||
            request.resourceType() === 'fetch'
        ) {

            console.log('RESPONSE STATUS:', response.status());
            console.log('RESPONSE URL   :', response.url());
        }
    });

    await contactPage.navigateToContactPage();

    await contactPage.fillContactForm(
        'Infosys',
        'Rakesh',
        'Kumar',
        'rakesh@gmail.com',
        'Hello I am rakesh',
    );

    await contactPage.clickSendMessage();

    await page.waitForTimeout(10000);
});
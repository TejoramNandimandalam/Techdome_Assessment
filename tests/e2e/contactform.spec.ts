import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';
import { DataProvider } from '../../pages/utils/dataProvider';
import { baseURL, HomePage } from "../../pages/HomePage";

//Load JSON test data Customdata.json
const jsonPath = "test-data/Customdata.json";
const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonTestData) {
    test(`Login Test with JSON Data: ${data.testName}, ${data.email}`, async ({ page }) => {

        test.setTimeout(60000);

        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await page.waitForTimeout(2000)
        await homePage.clickContactUs();

        const contactPage = new ContactPage(page)
        await contactPage.fillContactForm(data.company, data.fname, data.lname, data.email, data.message)

        if (data.expected.toLowerCase() === "success") {
            await contactPage.verifySuccessMessage();
        }
        else {
            await contactPage.clickSendMessage();

            const errors = await contactPage.getValidationMessages();
            expect(errors.length).toBeGreaterThan(0)
        }
    })
}

//Load CSV test data Customdata.json
const csvPath = "test-data/Customdata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);

for (const data of csvTestData) {
    test(`Login Test with CSV Data: ${data.testName}, ${data.email}`, async ({ page }) => {

        test.setTimeout(60000);

        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await page.waitForTimeout(2000)
        await homePage.clickContactUs();

        const contactPage = new ContactPage(page)
        await contactPage.fillContactForm(data.company, data.fname, data.lname, data.email, data.message)

        if (data.expected.toLowerCase() === 'success') {
            await contactPage.verifySuccessMessage()
        }
        else {
            await contactPage.clickSendMessage();
            await page.waitForTimeout(2000)
            const errors = await contactPage.getValidationMessages();
            expect(errors.length).toBeGreaterThan(0)
        }
    })

}
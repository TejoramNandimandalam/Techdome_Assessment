import { expect, test } from '@playwright/test';
import { NavigationPage } from '../../pages/NavigationPage';

test.describe('Navigation Tests', () => {

  test('Verify Expertise dropdown items are displayed', async ({ page }) => {

    test.setTimeout(90000);

  const navigationPage = new NavigationPage(page);

  await navigationPage.navigateToHomePage();

   await page.waitForTimeout(2000)

  await navigationPage.hoverElement('Expertise');

  await page.waitForTimeout(1000);

  await navigationPage.verifyDropdownVisible('API Testing Solution');

  await navigationPage.verifyNavigation('Expertise');
  
});

test('Verify Industries dropdown items are displayed', async ({ page }) => {

  test.setTimeout(60000);

  const navigationPage = new NavigationPage(page);

  await navigationPage.navigateToHomePage();

  await page.waitForTimeout(2000)

  await navigationPage.hoverElement('Industries');

  await navigationPage.verifyDropdownVisible('Information Technology');

  await navigationPage.verifyNavigation('Industries');
});

test('Verify Insights dropdown items are displayed', async ({ page }) => {

  const navigationPage = new NavigationPage(page);

  await navigationPage.navigateToHomePage();
  await page.waitForTimeout(2000)

  await navigationPage.hoverElement('Insights');

  await navigationPage.verifyDropdownVisible('Case Studies');
  await navigationPage.verifyDropdownVisible('Newsletter');

  await navigationPage.verifyNavigation('Insights');
});

});
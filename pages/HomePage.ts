import { Page, expect } from '@playwright/test';


export const baseURL = "https://techdome.io"

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
contactUsButton = () =>
  this.page.locator('span', { hasText: 'Contact Us' });

  meetTheMindsButton = () =>
    this.page.locator("text='Meet the Minds'");

  expandYourKnowledgeButton = () =>
    this.page.getByText('Expand Your Knowledge');

exploreMoreButton = () =>
  this.page.getByRole('button', { name: 'Explore More' }).first();


  // Actions
  async navigateToHomePage() {
    await this.page.goto(baseURL);
  }

async clickContactUs() {
  await this.page.waitForTimeout(2000)
  await this.contactUsButton().click();
}

  // Validations
  async verifyHomePageLoaded() {
    await expect(this.page).toHaveURL(baseURL);
    await expect(this.page).toHaveTitle(/Techdome/i);
  }
}
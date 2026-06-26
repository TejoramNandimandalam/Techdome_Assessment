import { Page, Locator, expect } from '@playwright/test';
import { baseURL } from './HomePage';

export class NavigationPage {

    private readonly page: Page;

    // Locators
    private readonly erpSolutionLink: Locator;
    private readonly finTechLink: Locator;
    private readonly navItems: Locator;
    private readonly itemLinks: Locator;

    // Constructor
    constructor(page: Page) {

        this.page = page;

        this.erpSolutionLink = page.getByRole('link', {
            name: 'icon ERP Solution Streamline'
        });

        this.finTechLink = page.getByRole('link', {
            name: 'icon Fintech Driving'
        });

        this.navItems = page.locator("div[class='flex flex-col flex-1'] >h3");
        this.itemLinks = page
             .locator("div.flex.cursor-pointer.overflow-hidden a,div[class='flex gap-5 max-md:flex-col max-md:gap-0']>a,div[class='flex cursor-pointer max-md:m-0 group']>a")
    }

    // Action Methods

    async navigateToHomePage() {
        await this.page.goto(baseURL);
    }

    async hoverElement(category:string)
    {
        await this.page.locator(`//div[text()='${category}']`).isEnabled();
      await this.page.locator(`//div[text()='${category}']`).click();
    }

    // Validation Methods

    async verifyERPSolutionVisible() {
        await expect(this.erpSolutionLink).toBeVisible();
    }

    async verifyFinTechVisible() {
        await expect(this.finTechLink).toBeVisible();
    }

    async verifyDropdownVisible(dropdownItem: string) {
        await this.page.getByRole('link', {name: dropdownItem, exact: true}).isVisible();
    }

    async verifyNavigation(category:string) {
      const items = await this.navItems.allInnerTexts()
      const links = await this.itemLinks.evaluateAll((elements, baseURL) => 
        elements.map(el => baseURL+el.getAttribute('href')),baseURL);

      const normalizedLinks = links.map(link =>
        link.endsWith('/') ? link: link+'/'
      );

      for(const title of items)
      {
        await this.page.waitForTimeout(1000)
        await this.hoverElement(category)
        await this.page.waitForTimeout(1000)
        await this.page.getByRole('link', { name: title }).first().click();
        await this.page.waitForTimeout(3000)
        const url = this.page.url()
        expect(normalizedLinks).toContain(url)
      }
    }
}
import { Page, Locator, expect } from '@playwright/test';
import { baseURL } from './HomePage';

export class ContactPage {
    private readonly page: Page;

    // Locators
    private readonly txtCompany: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtMessage: Locator;
    private readonly btnSendMessage: Locator;

    private readonly msgEmailValidation: Locator;
    private readonly msgMessageValidation: Locator;
    private readonly msgSuccess: Locator;

    constructor(page: Page) {
        this.page = page;

        this.txtCompany = page.getByRole('textbox', { name: 'Company *' });
        this.txtFirstName = page.getByRole('textbox', { name: 'First Name *' });
        this.txtLastName = page.getByRole('textbox', { name: 'Last Name *' });
        this.txtEmail = page.getByRole('textbox', { name: 'Email *' });
        this.txtMessage = page.getByRole('textbox', { name: 'Message' });

        this.btnSendMessage = page.getByRole('button', { name: 'Send Message' });

        this.msgEmailValidation = page.getByText('Please enter a valid email address (e.g., abc@xyz.com)');
        this.msgMessageValidation = page.getByText('Maximum 250 words allowed');
        this.msgSuccess = page.getByText(/Thank you/i);
    }

    // Navigation
    async navigateToContactPage(): Promise<void> {
        await this.page.goto(`${baseURL}/contact-us/`);
    }

    // Action Methods
    async setCompany(company: string): Promise<void> {
        await this.txtCompany.fill(company);
    }

    async setFirstName(firstName: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
    }

    async setLastName(lastName: string): Promise<void> {
        await this.txtLastName.fill(lastName);
    }

    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    async setMessage(message: string): Promise<void> {
        await this.txtMessage.fill(message);
    }

    async clickSendMessage(): Promise<void> {
        await this.btnSendMessage.click();
    }

    async fillContactForm(
        company: string,
        firstName: string,
        lastName: string,
        email: string,
        message: string
    ): Promise<void> {
        await this.setCompany(company);
        await this.setFirstName(firstName);
        await this.setLastName(lastName);
        await this.setEmail(email);
        await this.setMessage(message);
    }

    // Validation Methods
    async verifyEmailValidationMessage(): Promise<void> {
        await expect(this.msgEmailValidation).toBeVisible();
    }

    async verifyMessageValidationMessage(): Promise<void> {
        await expect(this.msgMessageValidation).toBeVisible();
    }

    async verifySuccessMessage(): Promise<void> {
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            expect(dialog.message()).toContain('Thank you for reaching out!');
            await dialog.accept();
        });

        await this.clickSendMessage();
    }

    async getValidationMessages(): Promise<string[]> {
    const validations: { locator: Locator; message: string }[] = [
        { locator: this.msgEmailValidation, message: "Invalid email" },
        { locator: this.msgMessageValidation, message: "Message exceeds 250 words" }
    ];

    const errors: string[] = [];

    for (const validation of validations) {
        if (await validation.locator.isVisible().catch(() => false)) {
            errors.push(validation.message);
        }
    }

    return errors;
}
}
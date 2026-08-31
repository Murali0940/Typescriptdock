import { Page, Locator } from '@playwright/test';



export class CompLoginPage {

    // Page
    private page: Page;

    // Locators

    private username: Locator;
    private password: Locator;
    private loginButton: Locator;
    private selectLanguage: Locator;
    private logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username =
            page.locator('#username');

        this.password =
            page.locator('#password');

        this.selectLanguage = page.locator('#mySelect');

        this.logoutButton = page.locator('#logout');

        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    // Actions

    async enterUsername(username: string) {

        await this.selectLanguage.selectOption('English');

        await this.username.fill(username);
    }

    async enterPassword(password: string) {

        await this.password.fill(password);
    }

    async compClickLogin() {

        await this.loginButton.click();
    }

    async clickLogout() {

        await this.logoutButton.click();
    }

    // Complete login action

    async login(
        username: string,
        password: string
    ) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.compClickLogin();
    }
}
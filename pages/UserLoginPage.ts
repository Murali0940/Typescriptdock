import { Page, Locator } from "@playwright/test";

export class UserLoginPage {

    private page: Page;

    private username: Locator;
    private password: Locator;
    private loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username = page.locator('#username');

        this.password = page.locator('#password');

        this.loginButton = page.locator('#login');
    }


    // Actions

    async enterUsername(username: string) {

        await this.username.fill(username);
    }

    async enterPassword(password: string) {

        await this.password.fill(password);
    }

    async clickLogin() {

        await this.loginButton.click();
    }


    async login(
        username: string,
        password: string
    ) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();
    }
}
import { Page, Locator } from "@playwright/test";

export class UserLoginPage {

    private page: Page;

    private username: Locator;
    private password: Locator;
    private loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username =
            page.getByPlaceholder('Username');

        this.password =
            page.getByPlaceholder('Password');

        this.loginButton =
            page.getByRole('button', {
                name: 'Login'
            });
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
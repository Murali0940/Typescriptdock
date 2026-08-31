import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/loginData';
import { CompLoginPage } from '../pages/CompLoginPage';
import { UserLoginPage } from '../pages/UserLoginPage';
import { Homepage } from '../pages/Homepage';

test('Login', async ({ page }) => {

    await test.step('Comp Login', async () => {

        const loginPage = new CompLoginPage(page);

        // =====================================================
        // VALID LOGIN
        // =====================================================

        // Open application
        await page.goto('https://www.alfadock-pack.com'
        );

        // Login with valid credentials
        await loginPage.login(
            loginData.validcompUser.compusername,
            loginData.validcompUser.comppassword
        );

        await loginPage.compClickLogin();



        // Verify successful login
        await expect(page).toHaveURL(
            'https://www.alfadock-pack.com/userlogin.html'
        );

    });



    await test.step('User Login', async () => {

        const userLoginPage = new UserLoginPage(page);

        await userLoginPage.login(
            loginData.validUser.userusername,
            loginData.validUser.userpassword
        );

        await userLoginPage.clickLogin();

        // Verify successful login
        await expect(page).toHaveURL(
            'https://www.alfadock-pack.com/ver10/#/home'
        );
    });

    await test.step('searchanyfile', async () => {
        const homepage = new Homepage(page);
        await homepage.clickSearchBar();
        await homepage.enterTextInSearchbar('.pdf');
        await homepage.clickSearchIcon();

    });


});

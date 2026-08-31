import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/loginData';
import { CompLoginPage } from '../pages/CompLoginPage';

test('Company User Login - Valid and Invalid', async ({ page }) => {

    const loginPage = new CompLoginPage(page);

    // =====================================================
    // VALID LOGIN
    // =====================================================

    // Open application
    await page.goto('https://www.alfadock-pack.com'
    );

    // Login with valid credentials
    await loginPage.login(
        loginData.validcompUser.username,
        loginData.validcompUser.password
    );

    // Verify successful login
    await expect(page).toHaveURL(
        'https://www.alfadock-pack.com/userlogin.html'
    );

    await loginPage.clickLogout();


    // =====================================================
    // INVALID LOGIN
    // =====================================================

    // Go back to login page
    await page.goto(
        'https://www.alfadock-pack.com'
    );

    // Login with invalid credentials
    await loginPage.login(
        loginData.invalidcompUser.username,
        loginData.invalidcompUser.password
    );


    // Verify error message
    await expect(
        page.getByText(
            'ログイン情報を正しく入力してください'
        )
    ).toBeVisible();

});


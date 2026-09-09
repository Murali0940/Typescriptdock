import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.locator('#first_name').waitFor({ state: 'visible' });

    await page.locator('#first_name').fill('Murali');
    page.waitForTimeout(3000);

});
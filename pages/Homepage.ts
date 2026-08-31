import { Locator, Page } from "@playwright/test";

export class Homepage {

    private page: Page;
    private searchbar: Locator;
    private searchIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchbar = page.getByPlaceholder('Search');
        this.searchIcon = page.locator('img[src="assets/ai-search.png"]');
    }

    async clickSearchBar() {
        await this.searchbar.click();
    }

    async enterTextInSearchbar(searchTerm: string) {
        await this.searchbar.fill(searchTerm);
    }

    async clickSearchIcon() {
        await this.searchIcon.click();
        await this.page.waitForTimeout(3000);
    }

    async doubleClickFirstFile() {



    }






}
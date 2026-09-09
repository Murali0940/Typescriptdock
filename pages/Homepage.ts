import { Locator, Page } from "@playwright/test";

export class Homepage {

    private page: Page;
    private searchbar: Locator;
    private searchIcon: Locator;
    private firstfile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchbar = page.getByPlaceholder('Search');
        this.searchIcon = page.locator('img[src="assets/ai-search.png"]');
        this.firstfile = page.locator("div.imageDiv").first();

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
        await this.page.waitForLoadState('load');
    }

    async doubleClickFirstFile(): Promise<void> {

        // Wait for the new tab while double-clicking the file
        const [viewerPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.firstfile.dblclick()
        ]);

        // Wait until the viewer page is completely loaded
        await viewerPage.waitForLoadState('load');

        console.log('Viewer opened');
        console.log('Viewer URL:', viewerPage.url());

        if (viewerPage.url().includes('pdfviewer')) {
            console.log('FIle is opened in PDFviewer');
        } else if (viewerPage.url().includes('a3dviewer')) {
            console.log("FIle is opened in a3dViewer");
        } else if (viewerPage.url().includes('csvviewer')) {
            console.log("File is opened in Csvviewer");
        } else if (viewerPage.url().includes('drawing')) {
            console.log("TIF or PNG or JPG file is opened in drawing viewer");
        } else {
            console.log("File is not opened in any viewer");
        }

        await this.page.waitForTimeout(3000);

        // Close the viewer tab
        await viewerPage.close();

        // Continue using the original tab
        await this.page.bringToFront();

        console.log('Viewer closed');
        console.log('Returned to previous tab');
    }


    async searchFile(filename: string) {
        await this.clickSearchBar();
        await this.enterTextInSearchbar(filename);
        await this.clickSearchIcon();
        await this.doubleClickFirstFile();
    }






}
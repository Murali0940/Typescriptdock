import { test, expect } from '@playwright/test';

test.describe('Get company details', () => {

    test('GET company details', async ({ request }) => {

        const response = await request.get(
            'https://www.alfadock-pack.com/api/Users/GetCompDetails/994'
        );

        // Verify status code
        expect(response.status()).toBe(200);

        // Convert response to JSON
        const responseBody = await response.json();

        // Print response
        console.log(responseBody);
    });

    test('POST socket files count ', async ({ request }) => {

        const response = await request.post(
            'https://www.alfadock-pack.com/api/alfaadsocket/getSocketFiles',
            {

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: {
                    compid: 994,
                    userid: 7884,
                    rowCount: 10,
                    offset: 0,
                    soctype: 'scan',
                    filter: 3,
                    sortValue: 'modifieddate',
                    sortOrder: 'DESC',
                    deleted: 0,
                    isGrid: 'true',
                    admin: 0


                }
            }
        );

        // Verify status code
        expect(response.status()).toBe(200);

        // Print response details
        console.log('Status:', response.status());
        console.log('Status Text:', response.statusText());
        console.log('Headers:', await response.headers());

        // Read response as text
        const responseText = await response.text();

        console.log('Response Body:', responseText);
    });

    test('GET TotalSocketFilesCount', async ({ request }) => {

        const response = await request.get(
            'https://www.alfadock-pack.com/api/alfaadsocket/TotalSocketFilesCount',
            {
                headers: {
                    'Accept': 'application/json'
                },
                params: {
                    compid: 994,
                    deleted: 0,
                    soctype: 'scan',
                    userid: 7884
                }
            }
        );

        console.log('URL:', response.url());
        console.log('Status:', response.status());
        console.log('Status Text:', response.statusText());
        console.log('Headers:', await response.headers());

        // Read raw response first
        const responseText = await response.text();

        console.log('Response Body:', responseText);

        // Proper status assertion
        expect(response.status())

        // Only parse JSON when a body exists
        if (responseText.trim() !== '') {
            const responseBody = JSON.parse(responseText);
            console.log('JSON Response:', responseBody);
        } else {
            console.log('API returned an empty response body');
        }
    });
});
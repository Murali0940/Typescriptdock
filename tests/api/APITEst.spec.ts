import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fake-json-api.mock.beeceptor.com';

test.describe('Company APIs', () => {

    test('GET - Get all companies', async ({ request }) => {

        const response = await request.get(
            `${BASE_URL}/companies`
        );

        expect(response.status()).toBe(200);

        expect(
            response.headers()['content-type']
        ).toContain('application/json');

        const companies = await response.json();

        expect(Array.isArray(companies)).toBeTruthy();

        expect(companies.length).toBe(11);

        console.log(companies);
    });


    test('GET - Get company by ID', async ({ request }) => {

        const companyId = 3;

        const response = await request.get(
            `${BASE_URL}/companies/${companyId}`
        );

        expect(response.status()).toBe(200);

        const company = await response.json();

        expect(company).toHaveProperty('id');
        expect(company).toHaveProperty('name');
        expect(company).toHaveProperty('address');
        expect(company).toHaveProperty('country');
        expect(company).toHaveProperty('employeeCount');
        expect(company).toHaveProperty('industry');
        expect(company).toHaveProperty('marketCap');
        expect(company).toHaveProperty('domain');
        expect(company).toHaveProperty('ceoName');

        expect(company.id).toBe(companyId);

        console.log('Company:', company);
    });


    test('GET - Validate company employee count', async ({ request }) => {

        const response = await request.get(
            `${BASE_URL}/companies/1`
        );

        expect(response.status()).toBe(200);

        const company = await response.json();

        expect(typeof company.employeeCount).toBe('number');

        expect(company.employeeCount).toBeGreaterThan(0);
    });


    test('GET - Validate company market cap', async ({ request }) => {

        const response = await request.get(
            `${BASE_URL}/companies/1`
        );

        const company = await response.json();

        expect(typeof company.marketCap).toBe('number');

        expect(company.marketCap).toBeGreaterThan(0);
    });

});
import { test, expect } from '@playwright/test';

test.describe('User Failure - Success Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
  });

  test('Successful user registration and account deletion', async ({ page }) => {
    // 1. Verify home page
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

    // 2. Go to signup
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

    // 3. Fill signup form with unique email
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;
    
    await page.getByRole('textbox', { name: 'Name' }).fill(`TestUser${timestamp}`);
    //await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(testEmail);
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').press('Enter');

    // 4. Fill account information
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).fill('validPassword123');
    await page.locator('#days').selectOption('17');
    await page.locator('#months').selectOption('10');
    await page.locator('#years').selectOption('2004');
    await page.locator('#newsletter').check();
    await page.locator('#optin').check();

    // 5. Fill address information
    await page.getByRole('textbox', { name: 'First name *' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('User');
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('Test Company');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('123 Test Street');
    await page.getByRole('textbox', { name: 'Address 2' }).fill('Apt 4B');
    await page.getByLabel('Country *').selectOption('United States');
    await page.getByRole('textbox', { name: 'State *' }).fill('California');
    await page.getByRole('textbox', { name: 'City *' }).fill('Los Angeles');
    await page.locator('#zipcode').fill('90210');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('1234567890');

    // 6. Create account
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // 7. Verify logged in
    await expect(page.getByText(`Logged in as TestUser${timestamp}`)).toBeVisible();

    // 8. Delete account (cleanup)
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});
//tests/test-1.spec.ts
import { test, expect } from '@playwright/test';

test('Register User', async ({ page }) => {
  // 1. Launch browser (implícito en Playwright)
  // 2. Navigate to url
  await page.goto('https://automationexercise.com/');
  
  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // 4. Click on 'Signup / Login' button
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  
  // 5. Verify 'New User Signup!' is visible
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

  // 6. Enter name and email address
  await page.getByRole('textbox', { name: 'Name' }).fill('pancho');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('rantonion2004@outlook.com');
  
  // 7. Click 'Signup' button
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').press('Enter');

  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

  // 9. Fill details: Title, Name, Email, Password, Date of birth
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).fill('automationexercise');
  await page.locator('#days').selectOption('17');
  await page.locator('#months').selectOption('10');
  await page.locator('#years').selectOption('2004');

  // 10. Select checkbox 'Sign up for our newsletter!'
  await page.locator('#newsletter').check();

  // 11. Select checkbox 'Receive special offers from our partners!'
  await page.locator('#optin').check();

  // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await page.getByRole('textbox', { name: 'First name *' }).fill('Ramon');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Naranjo');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('Tec');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Conq, 208');
  await page.getByRole('textbox', { name: 'Address 2' }).fill('Conq, 207');
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).fill('California');
  await page.getByRole('textbox', { name: 'City *' }).fill('Los Angeles');
  await page.locator('#zipcode').fill('12345');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('1234567891');

  // 13. Click 'Create Account button'
  await page.getByRole('button', { name: 'Create Account' }).click();

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();

  // 15. Click 'Continue' button
  await page.getByRole('link', { name: 'Continue' }).click();

  // 16. Verify that 'Logged in as username' is visible
  await expect(page.getByText('Logged in as pancho')).toBeVisible();

  // 17. Click 'Delete Account' button
  await page.getByRole('link', { name: ' Delete Account' }).click();

  // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});
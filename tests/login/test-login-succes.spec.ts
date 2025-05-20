import { test, expect } from '@playwright/test';

test.describe('User Login - Success Flow', () => {
  // Datos de prueba válidos
  const validCredentials = {
    email: 'rantonion2004@outlook.com',
    password: 'password', // Contraseña correcta
    username: 'pancho' // Nombre de usuario esperado después del login
  };

  test.beforeEach(async ({ page }) => {
    // 1. Launch browser (implícito en Playwright)
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('https://automationexercise.com/');
  });

  test('Successful user login with all verification steps', async ({ page }) => {
    // 3. Verify that home page is visible successfully
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

    // 4. Click on 'Signup / Login' button
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    
    // 5. Verify 'Login to your account' is visible
    await expect(page.getByText('Login to your account')).toBeVisible();
    await expect(page.locator('form').filter({ hasText: 'Login' })).toBeVisible();

    // 6. Enter correct email address and password
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(validCredentials.email);
    await page.getByPlaceholder('Password').fill(validCredentials.password);
    
    // 7. Click 'login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // 8. Verify that 'Logged in as username' is visible
    await expect(page.getByText(`Logged in as ${validCredentials.username}`)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

    // Limpieza: Logout después de la prueba
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
  });
});
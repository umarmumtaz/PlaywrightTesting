import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test.jobtrain.co.uk/ybscareers/Home/Job');
});
await page.locator('#favourit-border-20323').click();
await page.getByText('What\'s your email? This field').click();
await page.getByTestId('a-GO BACKLogin').click();
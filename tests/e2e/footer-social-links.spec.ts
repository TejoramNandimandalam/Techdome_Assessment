import { test, expect } from '@playwright/test';
import { baseURL } from '../../pages/HomePage';

test.describe('Footer Social Media Tests', () => {

    test('Verify social media links open successfully',
        async ({ page }) => {

            test.setTimeout(60000);

            await page.goto(baseURL)
            await page.waitForTimeout(3000)

            // Scroll to footer

            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });

            await page.waitForTimeout(2000);

            // LinkedIn

            const linkedInPopup = page.waitForEvent('popup');

            await page.getByRole('link', {
                name: 'linkedin.com icon'
            }).click();

            const linkedInPage = await linkedInPopup;

            await expect(linkedInPage)
                .toHaveURL(/linkedin/);

            // Instagram

            const instagramPopup = page.waitForEvent('popup');

            await page.getByRole('link', {
                name: 'instagram.com icon'
            }).click();

            const instagramPage = await instagramPopup;

            await expect(instagramPage)
                .toHaveURL(/instagram/);

            // YouTube

            const youtubePopup = page.waitForEvent('popup');

            await page.getByRole('link', {
                name: 'youtube.com icon'
            }).click();

            const youtubePage = await youtubePopup;

            await expect(youtubePage)
                .toHaveURL(/youtube/);

            // Twitter / X

            const twitterPopup = page.waitForEvent('popup');

            await page.getByRole('link', {
                name: 'twitter.com icon'
            }).click();

            const twitterPage = await twitterPopup;

            await expect(twitterPage)
                .toHaveURL(/twitter|x\.com/);
        });
});
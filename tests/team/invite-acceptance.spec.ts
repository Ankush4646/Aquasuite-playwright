import { test, expect } from '@playwright/test';
import { InviteAcceptancePage } from '../../pages/InviteAcceptancePage';

const inviteUrl = process.env.INVITE_URL || 'https://app.aquasuite.example/invite/accept?token=test-token';

test.describe('Invite acceptance flow', () => {
  test('invited user receives invite link, accepts it, and creates password', async ({ page }) => {
    const invitePage = new InviteAcceptancePage(page);

    await invitePage.openInviteLink(inviteUrl);
    await invitePage.acceptInvitation();
    await invitePage.createPassword('Welcome@123', 'Welcome@123');
    await invitePage.expectAccountReady();

    await expect(page.getByText(/welcome|account created|team/i)).toBeVisible();
  });
});

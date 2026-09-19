export const testData = {
  tenantName: 'AquaSuite Demo Tenant',
  tenantSlug: 'ygchm11r71',
  adminUser: {
    fullName: 'Tenant Admin',
    email: 'tenant-admin@aquasuite.test',
    password: 'Password123!',
  },
  inviteUser: {
    fullName: 'Invited User',
    email: 'member@aquasuite.test',
    password: 'Welcome@123',
    confirmPassword: 'Welcome@123',
    inviteUrl: process.env.INVITE_URL || 'https://app.aquasuite.example/invite/accept?token=test-token',
  },
  apiInviteResponse: {
    status: 'success',
    inviteId: 'inv_12345',
    inviteUrl: 'https://app.aquasuite.example/invite/accept?token=abc123',
    expiresAt: '2026-09-20T12:00:00Z',
  },
};

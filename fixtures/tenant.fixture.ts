import { test as base } from '@playwright/test';

export const tenantTest = base.extend({
  tenantName: ['AquaSuite Tenant', { option: true }],
});

import { test as base } from '@playwright/test';

export const test = base.extend({
  // Shared fixture for common test setup
});

export { expect } from '@playwright/test';

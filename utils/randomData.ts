export function randomEmail(domain = 'example.com') {
  return `user_${Date.now()}@${domain}`;
}

export function randomString(prefix = 'test') {
  return `${prefix}_${Date.now()}`;
}

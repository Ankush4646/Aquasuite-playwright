export function extractTenantSlugFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/^\//, '').split('/')[0];
    return path && path !== 'login' && path !== 'signup' ? path : null;
  } catch {
    return null;
  }
}

export function buildTenantUrl(baseUrl: string, slug: string, path = '/login') {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  return `${normalizedBase}/${slug}${path}`;
}

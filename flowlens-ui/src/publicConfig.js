export const projectLinks = {
  repository: 'https://github.com/dpeyupkaya/FlowLens.Client',
  portfolio: 'https://ekaya.com.tr/',
};

export function getPublicPathname(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return ['/', '/about', '/privacy', '/terms'].includes(normalized) ? normalized : '/';
}

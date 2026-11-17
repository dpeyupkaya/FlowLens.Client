export const projectLinks = {
  repository: 'https://github.com/dpeyupkaya/FlowLens.API',
  portfolio: 'https://ekaya.com.tr/',
};

export function getPublicPathname(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return ['/', '/about', '/privacy', '/terms'].includes(normalized) ? normalized : '/';
}

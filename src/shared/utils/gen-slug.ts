export const generateSlug = (string: string): string => {
  const slug = string
    .trim()
    .replace(/[\s]+/g, '_')
    .replace(/[^a-z0-9_-]+/gi, '')
    .toLowerCase();

  return slug;
};

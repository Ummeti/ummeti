export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^a-zA-Z0-9\u0600-\u06FF-]+/g, '') // Allow Arabic (Unicode range: \u0600-\u06FF)
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

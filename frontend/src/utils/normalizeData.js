export const normalizeData = (data) => {
  if (!data) return [];

  return Array.isArray(data)
    ? data.map(value => value.toLowerCase())
    : [data.toLowerCase()];
}

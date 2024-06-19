export const BACKEND_BASE_URL = ((): string => {
  const url = import.meta.env.VITE_BACKEND_BASE_URL
  if (url === undefined) throw new Error('BACKEND_BASE_URL is not set')
  return url
})()

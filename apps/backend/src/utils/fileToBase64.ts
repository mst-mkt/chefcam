export const fileToBase64 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  const binary = [...bytes].map((byte) => String.fromCharCode(byte)).join('')
  const base64String = btoa(binary)
  return `data:${file.type};base64,${base64String}`
}

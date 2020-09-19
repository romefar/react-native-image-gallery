export const getExtension = (filename: string): string => {
  return filename.split('.').reverse()[0]
}

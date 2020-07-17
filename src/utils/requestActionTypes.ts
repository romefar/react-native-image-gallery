export const scopedActionType = (prefix: string) => (name: string): string =>
  `${prefix}/${name}`

export const requestActionTypes = (prefix: string) => (
  name: string
): {
  request: string
  success: string
  failure: string
} => ({
  request: scopedActionType(prefix)(`${name}/request`),
  success: scopedActionType(prefix)(`${name}/success`),
  failure: scopedActionType(prefix)(`${name}/failure`)
})

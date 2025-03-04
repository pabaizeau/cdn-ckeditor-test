// errors.ts
export function ParseFunctionError(type: string): Error {
  return new Error(`\x1b[31m The Transform function for HTML tag "${type}" is not defined. \n
  Define your custom transform functions to support this tag. \x1b[0m`);
}
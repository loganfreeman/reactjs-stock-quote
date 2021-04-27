export function isEmptyOrSpaces(str: string) {
  return str.match(/^ *$/) !== null;
}
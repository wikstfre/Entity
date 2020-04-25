export function isObject(value: any): value is Object {
  return value && value instanceof Object;
}

export function isArray(value: any): value is Array<any> {
  return value && value instanceof Array;
}

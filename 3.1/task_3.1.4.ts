function mapObject<T extends globalThis.Record<string, any>, U>(
  obj: T,
  transformer: (value: T[keyof T]) => U
): globalThis.Record<keyof T, U> {
  const result: Partial<globalThis.Record<keyof T, U>> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = transformer(obj[key]);
    }
  }
  return result as globalThis.Record<keyof T, U>;
}

const scores = { "roma": 5, "vasya": 2 };
const passed = mapObject(scores, (x) => x > 2);
console.log(passed);
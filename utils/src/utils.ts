/**
 * Generate a random, unique string
 */
export function randomString(from = 10, to = 5): string {
  return btoa(String(Math.random())).substr(from, to).toLowerCase();
}

/**
 * Check if it's an object and it's not empty
 */
export function isObjectEmpty(obj: object | null): boolean {
  return !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);
}

/**
 * Get root host of current domain, if `hostname` is empty - `location.hostname` is used.
 * @example
 * ```ts
 * getRootHost('api.my-domain.com') // -> my-domain.com
 * ```
 */
export function getRootHost(hostname = location.hostname): string {
  const root = hostname.split('.').reverse().splice(0, 2).reverse().join('.');
  // localhost doesn't support (.) before it
  return root === 'localhost' ? root : '.' + root;
}

/**
 * Get converter number and suffix
 * @example
 * ```ts
 * getNumberAndSuffix(100000) // -> {value: 100, suffix: 'K'}
 * ```
 */
export function getNumberAndSuffix(
  value: number,
  fractionSize?: number
): { value: number; suffix: string } {
  if (!fractionSize || fractionSize < 0) {
    fractionSize = 1;
  }
  let abs = Math.abs(value);
  const rounder = Math.pow(10, fractionSize);
  let key = '';
  const powers = [
    { key: 'Q', value: Math.pow(10, 15) },
    { key: 'T', value: Math.pow(10, 12) },
    { key: 'B', value: Math.pow(10, 9) },
    { key: 'M', value: Math.pow(10, 6) },
    { key: 'K', value: 1000 },
  ];
  for (const item of powers) {
    let reduced = abs / item.value;
    reduced = Math.round(reduced * rounder) / rounder;
    if (reduced >= 1) {
      abs = reduced;
      key = item.key;
      break;
    }
  }
  return { value: abs, suffix: key };
}

/**
 * Convert a number to string and add suffix
 * @example
 * ```ts
 * suffixNumber(100000) // -> 100k
 * ```
 */
export function suffixNumber(
  numberToConvert: number,
  fractionSize?: number
): string {
  const { value, suffix } = getNumberAndSuffix(numberToConvert, fractionSize);
  return `${value}${suffix}`;
}

/**
 * Check if the value is valid Date
 * @example
 * ```ts
 * isDate(3) // -> false
 * ```
 */
export function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(+value);
}

export function getRandomNumber(): number {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const crypto = window.crypto || (window as any).msCrypto;
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
}

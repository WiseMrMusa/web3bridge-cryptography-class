// modular binary exponentiation
export const binexpmod = (a: bigint, b: bigint, m: bigint): bigint => {
  a = a % m;
  let res = 1n;
  while (b > 0n) {
    if (b & 1n) {
      res = (res * a) % m;
    }
    a = (a * a) % m;
    b >>= 1n;
  }
  return res;
};

export const extgcd = (a: bigint, b: bigint) => {
  if (b === 0n) {
    return {
      x: 1n,
      y: 0n,
      g: a,
    };
  } else {
    const { x: x1, y: y1, g } = extgcd(b, a % b);
    const x = y1;
    const y = x1 - (a / b) * y1;
    return { x, y, g };
  }
};
console.log(extgcd(948047n, 2426892n));

export const modinv = (a: bigint, m: bigint) => {
  let {x,y,g} = extgcd(a,m);
  if (g !== 1n) throw new Error("not coprime") 
  else {
    return (x % m + m) % m
  }
};

console.log(modinv(948047n, 2426892n))

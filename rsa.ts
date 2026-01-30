import { gcd } from "./primitives.ts"
import { binexpmod , modinv } from "./exp.ts"
import { encode , decode } from "./code.ts"

// const p = 1000000007n;
const p = 1000000000000066600000000000001n
const q = 65537n;

export const key_creation = (p: bigint,q: bigint,e: bigint) => {
  const N = p*q;
  const Nn = (p-1n)*(q-1n);
  if (gcd(e,Nn) == 1){
    const d = modinv(e,Nn)
    return {N,e,d} 
  } 
  else throw new Error("the e is not compatible")
}

export const encrypt_rsa = (m: bigint, {N, e}: {N:bigint, e: bigint}) => {
  return binexpmod(m,e,N)
}

export const decrypt_rsa = (c: bigint, {N,d}: {N:bigint, d:bigint}) => {
  return binexpmod(c,d,N)
}

const { N, e, d} = key_creation(p,q,948047n);
const msg = encode("Web3Bridge");
const cip = encrypt_rsa(msg,{N,e})
console.log(cip)
const msg_dec_rsa = decrypt_rsa(cip, {N,d})
console.log(decode(msg_dec_rsa))

// console.log(key_creation(1223n,1987n,948047n))
// console.log(encrypt_rsa(1070777n,{N: 2430101n, e: 948047n}))
// console.log(decrypt_rsa(1473513n, {N:2430101n, d:1051235n}))
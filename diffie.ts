import { binexpmod } from './exp.ts'

// Alice // Bob
const PRIME = 1000000000000066600000000000001n // Public
const g = 9n // Public

const a = 1052n // Private
const A = binexpmod(g,a,PRIME) // g^a
console.log({ a: a, A:A})

const b = 2546n // Private
const B = binexpmod(g,b,PRIME) // g^b
console.log({ b: b, B:B})

const key_a = binexpmod(572649994375618428166005817367n,1052n,PRIME)
const key_b = binexpmod(115603640424165970977556963447n,2546n,PRIME)
console.log(key_a)
console.log(key_b)
// Elliptic curves are solutions to the equation
// Y^2 = X^3 + AX + B
// To define an Elliptic curve (A,B)
class EllipticCurve {
  A: bigint;
  B: bigint;

  constructor(A: bigint, B: bigint) {
    if (4n * A ** 3n + 27n * B ** 2n == 0) throw new Error("non determinant");
    this.A = A;
    this.B = B;
  }

  isPoint(P: Point) {
    if (P.isInfinity()) return true;
    let { x, y } = P;
    if (y! ** 2n == x! ** 3n + this.A * x! + this.B) return true;
    else return false;
  }
  
  add(P: Point, Q: Point) {
    if P.isInfinity() return Q
    if Q.isInfinity() return P
    if ((P.x == Q.x) && (P.y == -Q.y)) return new Point.infinity()
    const slope = P.equals(Q) ? (3n*P.x**2n + this.A)/2n*P.y : (Q.y - P.y)/(Q.x - P.x)
    const x3 = slope**2n - P.x - Q.x 
    const y3 = slope*(P.x - x3) - P.y
    return new Point(x3, y3)
  }
}

class Point {
  x: bigint | null;
  y: bigint | null;

  constructor(x: bigint | null, y: bigint | null) {
    this.x = x;
    this.y = y;
  }

  // Point at infinity (identity element)
  static infinity(): Point {
    return new Point(null, null);
  }

  isInfinity(): boolean {
    return this.x === null && this.y === null;
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}

const E_1 = new EllipticCurve(-15n, 18n);
const p_1 = new Point(7n, 16n);
const p_2 = new Point(1n, 2n);
const p_3 = new Point(3n, 83n);
console.log(E_1.isPoint(p_1));
console.log(E_1.isPoint(p_2));
console.log(E_1.isPoint(p_3));

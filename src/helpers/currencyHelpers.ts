// Using 4 digits after the dot is the same precision that ZenMoney allows
const PRECISION = 4 ** 10

export const round = (amount: number): number =>
  Math.round(amount * PRECISION) / PRECISION

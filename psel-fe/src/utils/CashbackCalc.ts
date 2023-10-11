import type { Transaction } from "@/types/Transaction";

export function cashBackCaluator(arrays: Transaction[]) {
  const cashback = arrays.reduce((acc, cur) => acc + cur.value * cur.cashback, 0);
  return cashback.toFixed(2);
}
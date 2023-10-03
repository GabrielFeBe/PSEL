export interface ITransaction {
  transactionId: number;
  accountId: number;
  date?: Date;
  value: number;
  cashback?: number;
  account: any;
}

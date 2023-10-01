import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  accountId: number;

  @Column()
  date: Date;

  @Column()
  value: number;

  @Column()
  cashback: number;

  @OneToMany(() => Account, (account) => account.transactions)
  account: Account;
}

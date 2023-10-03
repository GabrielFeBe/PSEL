import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  accountId: number;

  @Column({ default: new Date() })
  date?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number;

  @Column({ nullable: true })
  cashback?: number;

  @OneToMany(() => Account, (account) => account.transactions)
  account: Account;
}

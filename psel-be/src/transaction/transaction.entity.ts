import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  accountId: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number;

  @Column({
    nullable: true,
    default: 0.02,
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  cashback?: number;

  @OneToMany(() => Account, (account) => account.transactions)
  account: Account;
}

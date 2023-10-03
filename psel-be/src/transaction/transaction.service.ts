import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { ITransaction } from './transaction.types';
import { AccountsService } from '../account/account.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private TransactionsRepository: Repository<Transaction>,
    private accountsService: AccountsService,
  ) {}

  findAll(id: number): Promise<ITransaction[]> {
    return this.TransactionsRepository.find({ where: { transactionId: id } });
  }

  findOne(id: number): Promise<ITransaction | null> {
    return this.TransactionsRepository.findOneBy({ transactionId: id });
  }

  async remove(id: number): Promise<void> {
    await this.TransactionsRepository.delete(id);
  }
  async create(transaction: ITransaction): Promise<ITransaction> {
    const account = await this.accountsService.findOne(transaction.accountId);
    if (!account.isActive) {
      throw new BadRequestException('Account has been deleted');
    }
    return await this.TransactionsRepository.save(transaction);
  }
  async addingCashback(
    id: number,
    { cashback }: { cashback: number },
  ): Promise<void> {
    const checkingTransaction = await this.findOne(id);
    if (!checkingTransaction)
      throw new NotFoundException('Transaction not found');

    await this.TransactionsRepository.update(id, { cashback });
  }
}

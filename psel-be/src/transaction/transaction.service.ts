import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private TransactionsRepository: Repository<Transaction>,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.TransactionsRepository.find();
  }

  findOne(id: number): Promise<Transaction | null> {
    return this.TransactionsRepository.findOneBy({ transactionId: id });
  }

  async remove(id: number): Promise<void> {
    await this.TransactionsRepository.delete(id);
  }
}

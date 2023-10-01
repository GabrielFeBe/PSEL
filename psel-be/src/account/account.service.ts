import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private AccountsRepository: Repository<Account>,
  ) {}

  findAll(): Promise<Account[]> {
    return this.AccountsRepository.find();
  }

  findOne(id: number): Promise<Account | null> {
    return this.AccountsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.AccountsRepository.delete(id);
  }
}

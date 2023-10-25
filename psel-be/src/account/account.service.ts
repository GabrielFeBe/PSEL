import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { AccountDto } from './account.validator';
import { AccountUpdateDto } from './update.validator';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private AccountsRepository: Repository<Account>,
  ) {}

  findAll(): Promise<Account[]> {
    // This is as usual findAll method, but we are using the repository to get the data;
    return this.AccountsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  // this will be user to get the account by the email, to check if the user exists, in the auth.service.ts;
  findOneByUsername(email: string): Promise<Account | null> {
    const account = this.AccountsRepository.findOneBy({ email });
    if (!account) throw new BadRequestException('Account not found');
    return account;
  }

  findOne(id: number): Promise<Account | null> {
    // This is as usual findOne method, but we are using the repository to get the data;
    return this.AccountsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    // This is as usual remove method, but we are using the repository to get the data, and instead of deleting we inactivate the account;
    await this.AccountsRepository.update(
      {
        id,
      },
      {
        isActive: false,
      },
    );
  }
  // And the AccountDto validates the data;
  async create(account: AccountDto): Promise<Account> {
    // here we validate if we at least have a cpf or cnpj;
    if (!account.cpf && !account.cnpj)
      throw new BadRequestException('CPF or CNPJ is required');
    // check if the email already exists;
    const accountExists = await this.AccountsRepository.findOneBy({
      email: account.email,
    });
    if (accountExists) {
      throw new BadRequestException('Email already exists');
    }
    // then if we do, we create the account;
    return this.AccountsRepository.save(account);
  }
  async update(id: number, account: AccountUpdateDto): Promise<Account> {
    // check if there is a cpf or cnpj in the request body;
    if (account.cpf || account.cnpj)
      throw new BadRequestException('CPF or CNPJ cannot be updated');
    // if it exists, we throw an error;

    // then if it does not, we update the account;
    await this.AccountsRepository.update({ id }, account);
    return this.AccountsRepository.findOneBy({ id });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './account.service';
import { AccountsController } from './account.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './account.entity';

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: {},
        },
      ],
    }).compile();

    accountsService = module.get<AccountsService>(AccountsService);
    accountsController = module.get<AccountsController>(AccountsController);
  });

  describe('getAccounts', () => {
    it('should return an account', async () => {
      const result = {
        id: 1,
        cpf: '42235901468',
        email: 'hu3master.zord@hotmail.com',
        password: '',
        name: 'testing',
        lastName: 'testing',
        isActive: true,
        transactions: [],
        cnpj: null,
      };

      jest
        .spyOn(accountsService, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await accountsController.getAccounts({ user: { sub: '1' } }),
      ).toEqual({ ...result, password: '' });
    });
  });
});

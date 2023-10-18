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
  describe('CreatingAccount', () => {
    it('should return an account when creating with a validBody', async () => {
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
        .spyOn(accountsService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await accountsController.CreatingAccount(result)).toEqual(result);
    });
    it('should throw an error when creating without cpf or cnpj', async () => {
      const invalidData = {
        id: 1,
        email: 'hu3master.zord@hotmail.com',
        password: 'teste123',
        name: 'testing',
        lastName: 'testing',
      };
      await expect(accountsService.create(invalidData)).rejects.toThrowError(
        'CPF or CNPJ is required',
      );
    });
  });
  describe('DeletingAccount', () => {
    it('should return an text when deleting account', async () => {
      const result = 'Account deleted';
      jest
        .spyOn(accountsService, 'remove')
        .mockImplementation(() => Promise.resolve());
      expect(
        await accountsController.deleteAccount({ user: { sub: '1' } }),
      ).toBe(result);
    });
  });
  describe('UpdatingAccount', () => {
    it('Working properly update', async () => {
      const validUpdateBody = {
        email: 'hu3master.zord@hotmail.com',
        password: 'teste123',
        name: 'testing',
        lastName: 'testing',
        transactions: [],
      };
      const validUpdateResponseMock = {
        id: 1,
        email: 'hu3master.zord@hotmail.com',
        password: 'teste123',
        isActive: true,
        name: 'testing',
        lastName: 'testing',
        cpf: '42235901468',
        transactions: [],
      };

      jest
        .spyOn(accountsService, 'update')
        .mockImplementation(() => Promise.resolve(validUpdateResponseMock));
      expect(
        await accountsController.updateAccount(
          { user: { sub: '1' } },
          validUpdateBody,
        ),
      ).toEqual(validUpdateResponseMock);
    });
    it('should throw an error when updating with cpf or cnpj', async () => {
      const validUpdateResponseMock = {
        email: 'hu3master.zord@hotmail.com',
        password: 'teste123',
        name: 'testing',
        lastName: 'testing',
        cpf: '42235901468',
        transactions: [],
      };
      await expect(
        accountsService.update(1, validUpdateResponseMock),
      ).rejects.toThrowError('CPF or CNPJ cannot be updated');
    });
  });
});

import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestModule } from './test.module';
import { AccountsService } from '../src/account/account.service';

describe('AppController (e2e), free of auth', () => {
  let app: INestApplication;
  const accountService = {
    findOne: () => {
      return {
        id: 1,
        cpf: '42235901468',
        cnpj: null,
        email: 'hu3master.zord@hotmail.com',
        isActive: true,
        name: 'Gabriel',
        lastName: 'Fernandes',
        password: 'aloteste',
      };
    },
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    })
      .overrideProvider(AccountsService)
      .useValue(accountService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  it(`/GET accounts`, () => {
    return request(app.getHttpServer()).get('/accounts').expect(200).expect({
      id: 1,
      cpf: '42235901468',
      cnpj: null,
      email: 'hu3master.zord@hotmail.com',
      isActive: true,
      name: 'Gabriel',
      lastName: 'Fernandes',
      password: '',
    });
  });
});

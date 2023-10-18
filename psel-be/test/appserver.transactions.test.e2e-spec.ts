import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestModule } from './test.module';
import { TransactionsService } from '../src/transaction/transaction.service';

describe('AppController (e2e), free of auth for Transactions', () => {
  let app: INestApplication;
  const transactionService = {
    findAll: () => {
      return [
        {
          transactionId: 1,
          accountId: 1,
          value: 100,
          cashback: 0.02,
        },
      ];
    },
    create: () => {
      return {
        transactionId: 1,
        accountId: 1,
        value: 100,
        cashback: 0.02,
      };
    },
  };
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    })
      .overrideProvider(TransactionsService)
      .useValue(transactionService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  it('/GET transactions', () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(200)
      .expect([
        {
          transactionId: 1,
          accountId: 1,
          value: 100,
          cashback: 0.02,
        },
      ]);
  });
  it('/POST transactions with an invalid body', () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .expect(400)
      .expect({
        message: [
          'O campo accountId deve ser um número inteiro',
          'O campo accountId é obrigatório',
          'value must be a number conforming to the specified constraints',
          'value should not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });
  it('/PATCH trying to add cashback without cashback', () => {
    return request(app.getHttpServer())
      .patch('/transactions/1')
      .expect(400)
      .expect({
        message: [
          'cashback must be a number conforming to the specified constraints',
          'cashback must not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

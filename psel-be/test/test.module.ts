import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../src/account/account.entity';
import { AccountModule } from '../src/account/account.module';
import { AuthModule } from '../src/auth/auth.module';
import { TransactionModule } from '../src/transaction/transaction.module';
import { Transaction } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1', // Use the name of the service from docker-compose.yml
      port: 5432, // default port for postgres
      username: 'postgres',
      password: '102030', // password defined in docker-compose.yml
      entities: [Account, Transaction],
      synchronize: true,
    }),
    TransactionModule,
    AccountModule,
    AuthModule,
  ],
})
export class AppModule {}

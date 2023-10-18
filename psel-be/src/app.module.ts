import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/account.entity';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

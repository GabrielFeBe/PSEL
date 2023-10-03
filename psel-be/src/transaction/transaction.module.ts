import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AccountModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionModule {}

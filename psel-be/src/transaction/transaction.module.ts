import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
// import { AccountsService } from './account.service';
// import { AccountsController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  // providers: [AccountsService],
  // controllers: [AccountsController],
})
export class TransactionModule {}

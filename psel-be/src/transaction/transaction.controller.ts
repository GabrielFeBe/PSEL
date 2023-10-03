import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { ValidationPipe } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionsDTO } from './transaction.validator';
import { CashbackDTO } from './cashback.validator';

@Controller('transactions')
@UsePipes(new ValidationPipe())
export class TransactionsController {
  constructor(private readonly appService: TransactionsService) {}
  // this is only an mock for now, i'll get the id by the authotization header, but for now i'll just pass the id as a param;
  @Get(':id')
  async getTransactions(
    @Param() { id }: { id: string },
  ): Promise<Transaction[]> {
    const response = await this.appService.findAll(+id);
    return response;
  }
  // creating a new account;
  @Post()
  async creatingTransaction(@Body() requestBody: TransactionsDTO) {
    // Dto to make sure the request body is correct;
    console.log(requestBody);
    return 'Exemplo criado com sucesso';
  }
  @Patch(':id')
  async addingCashback(
    @Param() { id }: { id: string },
    @Body() requestBody: CashbackDTO,
  ) {
    // Dto to make sure the request body is correct;
    //This is the same as const id = req.params.id;
    await this.appService.addingCashback(+id, requestBody);
    return 'Cahsback added sucessfully';
  }
}

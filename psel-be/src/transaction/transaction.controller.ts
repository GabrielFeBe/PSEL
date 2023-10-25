import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UsePipes,
} from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { ValidationPipe } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionsDTO } from './transaction.validator';
import { CashbackDTO } from './cashback.validator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('transactions')
@UsePipes(new ValidationPipe())
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly appService: TransactionsService) {}
  // getting all the transactions from the user, the userId is achieved by the token in the request;
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtain all the transactions' })
  @ApiResponse({
    status: 200,
    description: 'list of transactions returned sucessfully',
  })
  async getTransactions(@Request() req): Promise<Transaction[]> {
    //Here we get the id from the token if the token is valid;
    const { sub: idR } = req.user;
    console.log(idR);
    // then we look for the transactions with the id;
    const response = await this.appService.findAll(+idR);
    // and return the response;
    return response;
  }
  // creating a new transaction;
  @Post()
  // make nest return status for created
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Return the transaction that was created sucessfully',
  })
  @ApiBearerAuth()
  async creatingTransaction(@Body() requestBody: TransactionsDTO) {
    // Dto to make sure the request body is correct;
    const response = await this.appService.create(requestBody);
    return response;
  }
  // adding cashback to a transaction;
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'change the transaction cashback' })
  @ApiResponse({
    status: 200,
    description: 'Return a text saying that the cashback was added sucessfully',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Filtro para pegar transação pelo id',
  })
  async addingCashback(
    @Param() { id }: { id: string },
    @Body() requestBody: CashbackDTO,
  ) {
    // Dto to make sure the request body is correct;
    //This is the same as const id = req.params.id;
    await this.appService.addingCashback(+id, requestBody);
    // the return is just to show that the cashback was added if it's successful;
    return 'Cahsback added sucessfully';
  }
}

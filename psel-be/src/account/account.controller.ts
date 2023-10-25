import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AccountsService } from './account.service';
import { Account } from './account.entity';
import { ValidationPipe } from '@nestjs/common';
import { AccountDto } from './account.validator';
import { AccountUpdateDto } from './update.validator';
import { Public } from '../utils/public';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('accounts')
@UsePipes(new ValidationPipe())
export class AccountsController {
  constructor(private readonly appService: AccountsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Look for the account logged' })
  @ApiResponse({
    status: 200,
    description:
      'Return a body containing the account logged, without the password',
  })
  async getAccounts(@Request() req): Promise<Account> {
    // here we get the response from the service;
    const { sub: idR } = req.user;
    const response = await this.appService.findOne(+idR);
    // disable eslint for this line, because we are returning the password;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = response;
    return { ...result, password: '' };
  }
  // creating a new account;
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: 201,
    description: 'Return the account that was created sucessfully',
  })
  @ApiBearerAuth()
  async CreatingAccount(@Body() requestBody: AccountDto) {
    // here we get a request body and send it to the service;
    const response = await this.appService.create(requestBody);

    return response;
  }
  // Deleting an account, but in this case we will just turn it inactive;
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete the account logged' })
  @ApiResponse({
    status: 200,
    description: 'Return a message saying that the account was deleted',
  })
  async deleteAccount(@Request() req) {
    // i'm getting the id from the token wich i receive from the auth middleware after the user is authenticated;
    const { sub: idR } = req.user;
    await this.appService.remove(+idR);
    return 'Account deleted';
  }
  // Updating an account;
  @Patch()
  @ApiOperation({ summary: 'Update the account that is logged' })
  @ApiResponse({
    status: 200,
    description: 'Return the body of the account that was updated sucessfully',
  })
  @ApiBearerAuth()
  async updateAccount(@Request() req, @Body() requestBody: AccountUpdateDto) {
    const { sub: idR } = req.user;

    //This is the same as const id = req.params.id;
    const response = await this.appService.update(+idR, requestBody);
    return response;
  }
}

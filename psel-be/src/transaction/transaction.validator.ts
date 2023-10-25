import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TransactionsDTO {
  @ApiProperty()
  @IsOptional()
  @IsInt({ message: 'O campo transactionId deve ser um número inteiro' })
  transactionId?: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'O campo accountId é obrigatório' })
  @IsInt({ message: 'O campo accountId deve ser um número inteiro' })
  accountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;
}

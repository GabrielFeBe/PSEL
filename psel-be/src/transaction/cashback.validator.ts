import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CashbackDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'cashback must not be empty' })
  @IsNumber({ maxDecimalPlaces: 2 })
  cashback: number;
}

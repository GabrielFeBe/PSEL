import { IsNotEmpty, IsNumber } from 'class-validator';

export class CashbackDTO {
  @IsNotEmpty({ message: 'cashback must not be empty' })
  @IsNumber({ maxDecimalPlaces: 2 })
  cashback: number;
}

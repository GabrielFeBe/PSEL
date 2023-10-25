import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsCpfValidConstraint } from './cpf.validator';
import { IsCnpjValidConstraint } from './cnpj.validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty()
  @IsOptional()
  @IsInt({ message: 'O campo id deve ser um número inteiro' })
  id: number;

  @ApiProperty()
  @IsOptional()
  @Validate(IsCpfValidConstraint, {
    message: 'CPF inválido',
  })
  cpf?: string; // Note que alteramos para campo opcional

  @ApiProperty()
  @IsOptional()
  @Validate(IsCnpjValidConstraint, {
    message: 'CNPJ inválido',
  })
  cnpj?: string; // Também alterado para opcional

  @ApiProperty()
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
}

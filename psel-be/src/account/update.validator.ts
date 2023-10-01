import { IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class AccountUpdateDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  cnpj?: string;
}

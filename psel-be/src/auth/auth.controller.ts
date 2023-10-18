import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.validator';
import { Public } from '../utils/public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //  here we login the email and password, and return the token that's valid for 10days;
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}

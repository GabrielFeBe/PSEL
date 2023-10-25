import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../account/account.service';
import { compare } from '../utils/encrypter';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AccountsService,
    private jwtService: JwtService,
  ) {}
  // Auth service using JWT to sign the token;
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = await compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

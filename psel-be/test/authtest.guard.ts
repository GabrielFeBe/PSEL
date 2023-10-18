import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  //  this is basically the guard that we use to check if the user is authenticated or not;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    request['user'] = { sub: 1 };

    return true;
  }
}

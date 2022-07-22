import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { PasswordHelper } from '../helpers/password.helper';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (
      !user ||
      !this.passwordHelper.comparePasswordSync(password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

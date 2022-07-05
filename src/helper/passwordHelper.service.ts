import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHelperService {
  constructor(private readonly config: ConfigService) {}

  hashPasswordSync(password: string) {
    return bcrypt.hashSync(password, this.config.get('server.saltRound', 10));
  }

  comparePasswordSync(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

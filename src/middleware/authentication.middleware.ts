import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../api/user/user.service';
import { JwtHelper } from '../helpers/jwt.helper';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);
  constructor(
    private readonly jwtHelperService: JwtHelper,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const userPayload: any = this.jwtHelperService.decodeAccessTokenSync(token);
    if (userPayload && userPayload.id) {
      const user = await this.userService.findOne(userPayload.id);
      (req as any).user = user;
      next();
    } else {
      throw new HttpException('Token invalid', HttpStatus.FORBIDDEN);
    }
  }
}

import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CommonMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CommonMiddleware.name);
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const condition = true;
    if (condition) {
      // Do something
      next();
    } else {
      this.logger.error('Something wrong');
      throw new BadRequestException('Oops..');
    }
  }
}

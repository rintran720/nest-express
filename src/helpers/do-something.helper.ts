import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DoSomethingHelper {
  constructor(private readonly config: ConfigService) {}
}

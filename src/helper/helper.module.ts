import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtHelperService } from './jwtHelper.service';
import { PasswordHelperService } from './passwordHelper.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PasswordHelperService, JwtHelperService],
  exports: [PasswordHelperService, JwtHelperService],
})
export class HelperModule {}

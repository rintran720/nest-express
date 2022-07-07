import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtHelper } from '../../helpers/jwt.helper';
import { PasswordHelper } from '../../helpers/password.helper';
import { AuthenticationMiddleware } from '../../middleware/authentication.middleware';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
  providers: [UserService, PasswordHelper, JwtHelper],
  exports: [TypeOrmModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(UserController, '...other/routes');
  }
}

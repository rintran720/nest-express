import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHelper } from '../../helpers/password.helper';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtHelper } from './helpers/jwt.helper';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const services = [UserService];
const helpers = [PasswordHelper, JwtHelper];
const middlewares = [AuthenticationMiddleware];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
  providers: [...services, ...helpers, ...middlewares],
  exports: [TypeOrmModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(UserController, '...other/routes');
  }
}

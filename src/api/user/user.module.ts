import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { JwtHelper } from './helpers/jwt.helper';
import { PasswordHelper } from './helpers/password.helper';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { UserService } from './services/user.service';

const services = [UserService];
const helpers = [PasswordHelper, JwtHelper];
const middlewares = [AuthenticationMiddleware];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
  providers: [...services, ...helpers, ...middlewares],
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(UserController, '...other/routes');
  }
}

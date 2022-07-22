import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { JwtHelper } from './helpers/jwt.helper';
import { PasswordHelper } from './helpers/password.helper';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const helpers = [PasswordHelper, JwtHelper];
const services = [UserService, AuthService];
const strategies = [LocalStrategy, FacebookStrategy];
const middlewares = [AuthenticationMiddleware];

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [UserController, AuthController],
  providers: [...helpers, ...services, ...strategies, ...middlewares],
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(UserController, '...other/routes');
  }
}

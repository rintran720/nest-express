import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtHelper } from './helpers/jwt.helper';
import { PasswordHelper } from '../../helpers/password.helper';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly userService: UserService,
    private readonly passwordHelperService: PasswordHelper,
    private readonly jwtHelperService: JwtHelper,
  ) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  // @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('user')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const { password } = registerDto;

      const user = await this.userService.create({
        ...registerDto,
        password: this.passwordHelperService.hashPasswordSync(password),
      });
      return user;
    } catch (err) {
      // Error when can't create new document in DB
      this.logger.error(err.message);
      throw new HttpException('Please try later', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('user')
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findOneByEmail(email);
      if (!user) throw new Error('Account is not existed!');

      if (
        user.password &&
        this.passwordHelperService.comparePasswordSync(password, user.password)
      ) {
        return {
          token: this.jwtHelperService.generateAccessTokenSync({
            id: user._id,
          }),
          refreshToken: this.jwtHelperService.generateRefreshTokenSync({
            id: user._id,
          }),
        };
      }
      throw new Error('Login fail');
    } catch (err) {
      this.logger.error(err.message);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}

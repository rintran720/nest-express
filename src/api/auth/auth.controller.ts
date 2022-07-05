import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { JwtHelperService } from '../../helper/jwtHelper.service';
import { PasswordHelperService } from '../../helper/passwordHelper.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly userService: UserService,
    private readonly passwordHelperService: PasswordHelperService,
    private readonly jwtHelperService: JwtHelperService,
  ) {}

  @Post('/register')
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
            id: user.id,
          }),
          refreshToken: this.jwtHelperService.generateRefreshTokenSync({
            id: user.id,
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

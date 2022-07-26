import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { User } from '../entities/user.entity';
import { JwtHelper } from '../helpers/jwt.helper';
import { PasswordHelper } from '../helpers/password.helper';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly userService: UserService,
    private readonly passwordHelper: PasswordHelper,
    private readonly jwtHelper: JwtHelper,
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
        password: this.passwordHelper.hashPasswordSync(password),
      });
      return user;
    } catch (err) {
      // Error when can't create new document in DB
      this.logger.error(err.message);
      throw new HttpException('Please try later', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('user')
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request & { user: User },
  ) {
    return {
      token: this.jwtHelper.generateAccessTokenSync({
        id: request.user._id,
      }),
      refreshToken: this.jwtHelper.generateRefreshTokenSync({
        id: request.user._id,
      }),
    };
  }

  @ApiTags('user')
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @ApiTags('user')
  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    console.log(req.user);
    const { email, firstName, lastName } = req.user.user;
    await this.userService.create({
      firstName,
      lastName,
      email,
      password: '',
    });

    return req.user;
  }

  @ApiTags('user')
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @ApiTags('user')
  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: any): Promise<any> {
    console.log('redgg', req);

    return req.user;
  }
}

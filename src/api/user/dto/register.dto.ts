import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
  password: string;
}

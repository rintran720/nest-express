import { PartialType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {}

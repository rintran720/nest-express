import {
  applyDecorators,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoleType } from '~/common/constant/role-type';
import { RoleGuard } from '../guards/role.guard';

export interface IAuth {
  roles: RoleType[];
}

export function Auth({ roles = [] }: IAuth): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(RoleGuard /** Other guard*/),
    // UseInterceptors(DoSomethingInterceptor),
    // Other decorators you need
  );
}

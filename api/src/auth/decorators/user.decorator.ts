import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User as UserEntity } from "../../users/entities/user.entity";

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

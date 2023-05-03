import { IExpressRequest } from '../../types/expressRequest.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Service = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IExpressRequest>();

    if (!request.service) {
      return null;
    }

    if (data) {
      return request.service[data];
    }

    return request.service;
  },
);

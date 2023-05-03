import { ServiceService } from '../service.service';
import { IExpressRequest } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify, JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

type customJwtPayload = JwtPayload & {
  shortName: string;
  id: string;
};
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly serviceService: ServiceService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.service = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, process.env.JWT_SECRET) as customJwtPayload;
      const service = await this.serviceService.findById(decode.id);
      req.service = service;
      next();
    } catch (error) {
      req.service = null;
      next();
      return;
    }
  }
}

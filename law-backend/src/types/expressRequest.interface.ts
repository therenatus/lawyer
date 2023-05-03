import { ServiceEntity } from '../service/service.entity';
import { Request } from 'express';

export interface IExpressRequest extends Request {
  service?: ServiceEntity;
}

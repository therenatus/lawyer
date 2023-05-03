import { ServiceEntity } from '../service/service.entity';
import { IServiceResponse } from '../service/types/response.interface';
import { generateJwt } from './jwt';

export const buildResponseInterface = (
  service: ServiceEntity,
): IServiceResponse => {
  return {
    service: service,
    token: generateJwt(service),
  };
};

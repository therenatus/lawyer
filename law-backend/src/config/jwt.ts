import { ServiceEntity } from '../service/service.entity';
import { sign } from 'jsonwebtoken';

export const generateJwt = (service: ServiceEntity): string => {
  return sign(
    {
      id: service.id,
      shortName: service.shortName,
    },
    process.env.JWT_SECRET,
  );
};

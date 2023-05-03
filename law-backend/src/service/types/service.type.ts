import { ServiceEntity } from './../service.entity';

export type ServiceType = Omit<ServiceEntity, 'hashPassword'>;

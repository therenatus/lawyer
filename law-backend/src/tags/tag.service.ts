import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getHello(): string {
    return 'Get Hello';
  }
}

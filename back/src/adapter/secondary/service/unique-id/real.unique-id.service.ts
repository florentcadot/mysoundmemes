import { v4 } from 'uuid';
import { UniqueIdService } from '../../../../core/port/service/unique-id.service.port';

export class RealUniqueIdService implements UniqueIdService {
  generate(): string {
    return v4()
  }
}

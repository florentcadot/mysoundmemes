import * as bcrypt from 'bcrypt'
import { PasswordHashingService } from '../../../../core/port/service/password-hashing.service.port';

export class RealPasswordHashingService implements PasswordHashingService {

  public hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  public async check(password: string, hashPassword: string ): Promise<boolean>{
    return await bcrypt.compare(password, hashPassword)
  }

}


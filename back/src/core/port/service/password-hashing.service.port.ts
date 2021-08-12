export interface PasswordHashingService {
  hash(password: string): Promise<string>
  check(password: string, hashPassword: string): Promise<boolean>
}

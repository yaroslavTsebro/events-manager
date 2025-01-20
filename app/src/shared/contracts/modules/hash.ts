export const HASH_SERVICE = Symbol('HashService')

export interface IHashService {
  hash(password: string, rounds: number): Promise<string>
  verify(password: string, hashedPassword: string): Promise<boolean>
}
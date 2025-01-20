export interface IAuthStrategy<D,R> {
  authenticate(payload: D): Promise<R>;
}
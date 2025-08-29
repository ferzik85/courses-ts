import type { User } from './User';

export interface Data<T> {
  successful: boolean;
  user: User;
  result: T;
}

export function isSuccessful<T>(d: Data<T> | null | undefined): d is Data<T> {
  return d?.successful === true;
}
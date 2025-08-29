import type { User } from "../models/User";

const activeUserKey = "activeUser";

function safeParse(json: string): User {
  try {
    const user = JSON.parse(json);
    return user && typeof user === "object" ? (user as User) : {} as User;
  } catch {
    return {} as User;
  }
}

export function getUser(): User {
  const user = localStorage.getItem(activeUserKey);
  return safeParse(user!);
}

export function removeActiveUserFromLocalStorage(): void {
  localStorage.removeItem(activeUserKey);
}

export function putUser(user: User): void {
  removeActiveUserFromLocalStorage();
  localStorage.setItem(activeUserKey, JSON.stringify(user));
}

export function isAdminUser(): boolean {
  return getUser()?.role?.toLowerCase() === "admin";
}

export function getUserName(): string | null {
  return getUser()?.name ?? null;
}

export function getUserToken(): string {
  return getUser()?.token ?? '';
}

export function getUserRole(): string | null {
  return getUser()?.role ?? null;
}

export function userTokenIsSet(): boolean {
  const token = getUser()?.token;
  return typeof token === "string" && token.length > 0;
}

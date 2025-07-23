export interface User {
  username: string;
  password: string;
}

export interface LoginUsers {
  valid: User[];
  invalid: User[];
}

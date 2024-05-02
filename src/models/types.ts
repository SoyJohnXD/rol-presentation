export interface IUser {
  id?: number;
  email?: string;
  role?: string;
}

export interface IRole {
  description: string;
  id: number;
  name: string;
  permissions: string[];
}

export interface IUser {
  _id: string;

  name: string;
  email: string;
  password?: string;
  role: ValidRoles;

  createdAt?: string;
  updatedAt?: string;
}

export enum ValidRoles {
  admin = 'admin',
  client = 'client',
}

export enum ValidAdminRoles {
  admin = 'admin',
  superUser = 'super-user',
}

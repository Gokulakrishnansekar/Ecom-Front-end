import { Roles } from './roles.model';

export class UsersModel {
  id: number;
  username: string;
  mail: string;
  password: string;
  roles: Roles[];
  constructor(params?: UsersModel) {
    Object.assign(this, params);
  }
}

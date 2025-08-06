export class LoginModel {
  username: string;
  password: string;
  constructor(params?: LoginModel) {
    Object.assign(this, params || {});
  }
}

export class PasswordModel {
  name: string;
  currentPassword: string;
  newPassword: string;
  constructor(params?: PasswordModel) {
    Object.assign(this, params || {});
  }
}

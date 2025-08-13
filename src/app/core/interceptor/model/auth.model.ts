export enum HttpHeader {
  SKIP_INTERCEPTOR = 'skip-interceptor',
  Authorization = 'Authorization',
  ContentType = 'Content-Type',
}

export class AuthUserModel {
  constructor(params?: AuthUserModel) {
    Object.assign(this, params || {});
  }
  sub: string;
  roles: string;
  user_id: number;
}

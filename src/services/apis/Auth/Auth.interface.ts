export interface IReqRegisterAccount {
  phone: string;
  password: string;
  fullname: string;
  province: string;
  email: string;
}

export interface IReqLogin {
  email: string;
  password: string;
}

export interface IReqVerifyAccount {
  email: string;
  code: string;
}

export interface IReqChangePassword {
  password: string;
  newPassword: string;
}

export interface IReqChangeEmail {
  email: string;
}

export interface IReqVerifyUpdateEmail {
  currentEmail: string;
  email: string;
  code: string;
}

export interface IReqForgoPassword {
  email: string;
}

export interface IReqVerifyCodeForgotPassword {
  email: string;
  code: string;
}

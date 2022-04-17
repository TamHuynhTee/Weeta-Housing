export interface IReqRegisterAccount {
  username: string;
  phoneNumber: string;
  fullname: string;
  email: string;
  password: string;
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
  oldPassword: string;
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

export interface IReqForgotPassword {
  email: string;
}

export interface IReqVerifyCodeForgotPassword {
  email: string;
  code: string;
}

export interface IReqUpdateAccount {
  username: string;
  phoneNumber: string;
  fullname: string;
  email: string;
  gender: string;
  introduction: string;
}

export interface IReqUpdateAvatar {
  file: File;
}

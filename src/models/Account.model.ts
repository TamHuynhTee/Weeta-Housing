import { ACCOUNT_GENDER, ROLE } from '@/constants/base.constants';

export interface accountModel {
  readonly _id: string;
  role: ROLE;
  gender: ACCOUNT_GENDER;
  isEmailVerified: boolean;
  isActive: boolean;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  avatar: string;
}

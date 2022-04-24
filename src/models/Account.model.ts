import { ACCOUNT_GENDER, ROLE } from '@/constants/base.constants';

export interface ACCOUNT_MODEL {
  readonly _id: string;
  role: ROLE;
  gender: ACCOUNT_GENDER;
  isEmailVerified: boolean;
  isActive: boolean;
  isAutoApproved: boolean;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  introduction: string;
}

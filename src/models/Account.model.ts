import { ACCOUNT_GENDER, ROLE } from '@/constants/base.constants';

export interface ACCOUNT_MODEL {
  readonly _id: string;
  role: ROLE;
  gender: ACCOUNT_GENDER;
  isEmailVerified: boolean;
  isActive: boolean;
  isApproved: boolean;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  introduction: string;
  saveArticle: Array<string>;
  //   lessor model
  IDCard: Array<string>;
  lessorId: string;
  memberPackageId: string;
  articleTotal: number;
  articleUsed: number;
  isAutoApproved: boolean;
  isBan: boolean;
}

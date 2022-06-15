import {
  ACCOUNT_GENDER,
  ENUM_ACCOUNT_TYPE,
  ENUM_TYPE_MEMBER,
  ROLE,
} from '@/constants/base.constants';

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
  accountType: ENUM_ACCOUNT_TYPE;

  //   lessor model
  IDCard: Array<string>;
  lessorId: string;
  memberPackageId: string;
  memberPackage: ENUM_TYPE_MEMBER;
  articleTotal: number;
  articleUsed: number;
  isAutoApproved: boolean;
  isBan: boolean;
}

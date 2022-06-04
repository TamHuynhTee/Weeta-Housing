import { ENUM_TYPE_MEMBER } from '@/constants/base.constants';

export interface MEMBER_PACKAGE_CARD_MODEL {
  readonly description: string;
  readonly titleColor: string;
  readonly packageName: string;
  readonly price: number;
  readonly limitArticle: number;
  readonly memberPackage: ENUM_TYPE_MEMBER;
}

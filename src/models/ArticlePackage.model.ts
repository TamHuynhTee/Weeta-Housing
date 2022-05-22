import { ENUM_TYPE_ARTICLE } from '@/constants/base.constants';

export interface ARTICLE_PACKAGE_MODEL {
  readonly _id: string;
  price: number;
  serviceName: ENUM_TYPE_ARTICLE;
}

export interface ARTICLE_PACKAGE_CARD_MODEL {
  readonly description: string;
  readonly titleColor: string;
  readonly title: string;
  readonly price: number;
  readonly serviceName: ENUM_TYPE_ARTICLE;
}

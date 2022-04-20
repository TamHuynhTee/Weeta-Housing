import { ENUM_TYPE_ARTICLE } from '@/constants/base.constants';

export interface ARTICLE_MODEL {
  readonly _id: string;
  title: boolean;
  image: Array<string>;
  price: number;
  area: number;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  isApproved: boolean;
  isAvailable: boolean;
  isDelete: boolean;
  createdAt: boolean;
  servicePackageId: string;
  servicePackageName: ENUM_TYPE_ARTICLE;
  startDate: string;
  endDate: string;
  timeService: number;
}

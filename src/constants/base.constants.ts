import { ARTICLE_PACKAGE_CARD_MODEL } from '@/models/ArticlePackage.model';

export enum BASE_CONSTANTS {
  BASE_URL = 'https://weetabe.herokuapp.com/api',
  BASE_URL_LOCAL = 'http://localhost:5000/api',
}

export enum ROLE {
  USER = 'user',
  LESSOR = 'lessor',
}

export enum ACCOUNT_GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export const DEFAULT_AVATAR = `https://firebasestorage.googleapis.com/v0/b/weeta-housing.appspot.com/o/avatar_default.png?alt=media&token=34619e46-80b6-45e5-b8ce-760d618db094`;

export enum ENUM_TYPE_ARTICLE {
  TOP = 'TOP',
  COMMON = 'COMMON',
  UP = 'UP',
}

export enum ENUM_TYPE_MEMBER {
  FREE = 'FREE',
  SAVE = 'SAVE',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export const TYPE_MEMBER = {
  FREE: { name: 'MIỄN PHÍ', color: '#000' },
  SAVE: { name: 'TIẾT KIỆM', color: 'rgb(17_182_102)' },
  STANDARD: { name: 'TIÊU CHUẨN', color: 'rgb(4_153_168)' },
  PREMIUM: { name: 'CAO CẤP', color: 'rgb(235_130_25)' },
};

export enum ENUM_MESSAGE_MODE {
  CHAT = 'CHAT',
  EDIT = 'EDIT',
}

export enum ENUM_PAYMENT_TYPE {
  MEMBER_PACKAGE = 'MEMBERPACKAGE',
  SERVICE_PACKAGE = 'SERVICEPACKAGE',
}

export const DEFAULT_CENTER_COORDINATES = {
  lat: 10.779454,
  lng: 106.693039,
};

export const DEFAULT_CENTER_ZOOM = 13;

export const DEFAULT_DATE_START = '2021-01-01';

export const HOME_BANNER_CAROUSEL = [
  '/images/img_home_image_1.jpg',
  '/images/img_home_image_2.jpg',
  '/images/img_home_image_3.jpg',
  '/images/img_home_image_4.jpg',
  '/images/img_home_image_5.jpg',
];

export const ARTICLE_PACKAGES: Array<ARTICLE_PACKAGE_CARD_MODEL> = [
  {
    serviceName: ENUM_TYPE_ARTICLE.COMMON,
    titleColor: 'rgb(4_153_168)',
    title: 'COMMON',
    price: 0,
    description:
      'Gói thường, tin đăng sẽ được hiển thị sắp xếp theo thời gian đăng, làm mới 1 lần/ngày',
  },
  {
    serviceName: ENUM_TYPE_ARTICLE.UP,
    titleColor: 'rgb(17_182_102)',
    title: 'UP',
    price: 20000,
    description:
      'Gói nâng cấp, tin đăng được hiển thị đầu danh sách mục tìm kiếm theo thứ tự thời gian đăng , làm mới 1 lần/ngày',
  },
  {
    serviceName: ENUM_TYPE_ARTICLE.TOP,
    titleColor: 'rgb(235_130_25)',
    title: 'TOP',
    price: 30000,
    description:
      'Gói cao cấp, tin đăng sẽ nằm ở mục ưu tiên trên đầu danh sách hiển thị, làm mới 1 lần/ngày',
  },
];

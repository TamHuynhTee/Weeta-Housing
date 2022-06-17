import { ARTICLE_PACKAGE_CARD_MODEL } from '@/models/ArticlePackage.model';
import { MEMBER_PACKAGE_CARD_MODEL } from '@/models/MemberPackage.model';

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

export enum ENUM_TYPE_REASON {
  ARTICLE = 'article',
  LESSOR = 'lessor',
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

export enum ENUM_ACCOUNT_TYPE {
  NORMAL = 'normal',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum ENUM_PAYMENT_METHOD {
  VNPAY = 'VNPAY',
  MOMO = 'MOMO',
}

export enum ENUM_SOCIAL_LOGIN {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

export enum ENUM_PAYMENT_STATUS {
  SUCCESS = 'SUCCESS',
  WAIT_FOR_PAYMENT = 'WAITFORPAYMENT',
}
export enum ENUM_PAYMENT_UNIT {
  MONTH = 'month',
  DAY = 'day',
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
    titleColor: 'text-[rgb(4_153_168)]',
    title: 'COMMON',
    price: 0,
    description:
      'Gói thường, tin đăng sẽ được hiển thị sắp xếp theo thời gian đăng, làm mới 1 lần/ngày',
  },
  {
    serviceName: ENUM_TYPE_ARTICLE.UP,
    titleColor: 'text-[rgb(17_182_102)]',
    title: 'UP',
    price: 20000,
    description:
      'Gói nâng cấp, tin đăng được hiển thị đầu danh sách mục tìm kiếm theo thứ tự thời gian đăng , làm mới 1 lần/ngày',
  },
  {
    serviceName: ENUM_TYPE_ARTICLE.TOP,
    titleColor: 'text-[rgb(235_130_25)]',
    title: 'TOP',
    price: 30000,
    description:
      'Gói cao cấp, tin đăng sẽ nằm ở mục ưu tiên trên đầu danh sách hiển thị, làm mới 1 lần/ngày',
  },
];

export const MEMBER_PACKAGES: Array<MEMBER_PACKAGE_CARD_MODEL> = [
  {
    memberPackage: ENUM_TYPE_MEMBER.FREE,
    packageName: 'Miễn phí',
    titleColor: 'text-[#000]',
    limitArticle: 3,
    price: 0,
    description: 'Gói miễn phí, làm mới 1 lần/ngày',
  },
  {
    memberPackage: ENUM_TYPE_MEMBER.SAVE,
    packageName: 'Tiết kiệm',
    titleColor: 'text-[rgb(17_182_102)]',
    limitArticle: 10,
    price: 100000,
    description: 'Gói tiết kiệm, làm mới 1 lần/ngày',
  },
  {
    memberPackage: ENUM_TYPE_MEMBER.STANDARD,
    packageName: 'Tiêu chuẩn',
    titleColor: 'text-[rgb(4_153_168)]',
    limitArticle: 20,
    price: 300000,
    description: 'Gói tiêu chuẩn, làm mới 1 lần/ngày',
  },
  {
    memberPackage: ENUM_TYPE_MEMBER.PREMIUM,
    packageName: 'Cao cấp',
    titleColor: 'text-[rgb(235_130_25)]',
    limitArticle: 50,
    price: 500000,
    description: 'Gói cao cấp, làm mới 1 lần/ngày',
  },
];

export const FACILITIES = [
  {
    label: 'Ở chung với chủ',
    icon: '/icons/ic_facilities_live_with_owner.png',
    register: 'liveWithOwner',
  },
  {
    label: 'Có chỗ đậu xe',
    icon: '/icons/ic_facilities_parking.png',
    register: 'parking',
  },
];

export const TYPE_USER = [
  {
    label: 'Học sinh, sinh viên',
    register: 0,
  },
  {
    label: 'Người lao động',
    register: 1,
  },
];

export const LIMIT_TIME = [
  { label: 'Thoải mái thời gian', value: '' },
  { label: '20:00', value: '20:00' },
  { label: '21:00', value: '21:00' },
  { label: '22:00', value: '22:00' },
  { label: '23:00', value: '23:00' },
  { label: '00:00', value: '00:00' },
];

export const ELECTRIC_UNIT = [{ label: 'kWh', value: 'kWh' }];
export const WATER_UNIT = [
  { label: 'khối', value: 'block' },
  { label: 'người/tháng', value: 'perCapita' },
];
export const WIFI_UNIT = [{ label: 'người/tháng', value: 'perCapita' }];

/** Cac vi tri gan nha tro
 * 0: Truong hoc
 * 1: Cho
 * 2: Sieu thi
 * 3: Benh vien
 * 4: Tram xe buyt
 * 5: Khu mua sam
 * 6: Thu vien
 * 7: Cua hang tien loi
 * 8: Cong an phuong
 * 9: Nha thuoc
 * 10: Cay xang
 * 11: Ngan hang
 */
export const PLACES = {
  SCHOOL: 0,
  MARKET: 1,
  SUPERMARKET: 2,
  HOSPITAL: 3,
  BUS_STOP: 4,
  MALL: 5,
  LIBRARY: 6,
  GROCERY: 7,
  POLICE_STATION: 8,
  PHARMACY: 9,
  GAS: 10,
  BANK: 11,
};

export const PLACES_AROUND = [
  {
    label: 'Trường học',
    icon: '/icons/ic_facilities_place_school.png',
    register: 0,
  },
  {
    label: 'Chợ',
    icon: '/icons/ic_facilities_place_market.png',
    register: 1,
  },
  {
    label: 'Siêu thị',
    icon: '/icons/ic_facilities_place_supermarket.png',
    register: 2,
  },
  {
    label: 'Bệnh viện',
    icon: '/icons/ic_facilities_place_hospital.png',
    register: 3,
  },
  {
    label: 'Trạm xe buýt',
    icon: '/icons/ic_facilities_place_bus_stop.png',
    register: 4,
  },
  {
    label: 'Khu mua sắm',
    icon: '/icons/ic_facilities_place_mall.png',
    register: 5,
  },
  {
    label: 'Thư viện',
    icon: '/icons/ic_facilities_place_library.png',
    register: 6,
  },
  {
    label: 'Cửa hàng tiện lợi',
    icon: '/icons/ic_facilities_place_grocery.png',
    register: 7,
  },
  {
    label: 'Công an',
    icon: '/icons/ic_facilities_place_police.png',
    register: 8,
  },
  {
    label: 'Nhà thuốc',
    icon: '/icons/ic_facilities_place_pharmacy.png',
    register: 9,
  },
  {
    label: 'Cây xăng',
    icon: '/icons/ic_facilities_place_gas.png',
    register: 10,
  },
  {
    label: 'Ngân hàng',
    icon: '/icons/ic_facilities_place_bank.png',
    register: 11,
  },
];

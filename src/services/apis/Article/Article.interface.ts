import { GET_LIST_PARAMS } from '@/services/interfaces';

export interface IReqCreateArticle {
  title: string;
  district: string;
  ward: string;
  street: string;
  area: number;
  price: number;
  description: string;
  files: Array<File>;
}

export interface IParamGetArticle extends GET_LIST_PARAMS {
  'area[gte]': string;
  'area[lte]': string;
  'price[gte]': string;
  'price[lte]': string;
  'startDate[gte]': string;
  district: string;
  ward: string;
}

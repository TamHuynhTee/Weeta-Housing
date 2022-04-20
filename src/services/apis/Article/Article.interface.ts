import { GET_LIST_PARAMS } from '@/services/interfaces';

export interface IReqCreateArticle {
  title: string;
  address: string;
  area: number;
  price: number;
  description: string;
}

export interface IParamGetArticle extends GET_LIST_PARAMS {
  area: number;
  district: string;
  deletedAt: Date;
  startDate: Date;
  price: number;
  servicePackageId: string;
}

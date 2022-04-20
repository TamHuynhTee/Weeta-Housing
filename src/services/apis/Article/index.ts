import { RouteApi } from '../../../constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { IParamGetArticle, IReqCreateArticle } from './Article.interface';
import { resGetListArticle } from './Article.type';

const url = RouteApi.article;

export const getListArticleService = (
  params: Partial<IParamGetArticle>
): Promise<ReturnResponse<resGetListArticle>> => {
  return API.get(`${url}/getListArticle`, { ...params }) as any;
};

export const createArticleService = (
  payload: IReqCreateArticle
): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/createArticle`, {
    body: { ...payload },
  }) as any;
};

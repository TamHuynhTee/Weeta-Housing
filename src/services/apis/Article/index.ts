import { RouteApi } from '../../../constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { IReqCreateArticle } from './Article.interface';

const url = RouteApi.article;

export const createArticleService = (
  payload: IReqCreateArticle
): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/createArticle`, {
    body: { ...payload },
  }) as any;
};

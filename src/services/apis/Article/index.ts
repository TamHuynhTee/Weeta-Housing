import { ARTICLE_MODEL } from '@/models/Article.model';
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

export const getListTopArticleService = (
  params: Partial<IParamGetArticle>
): Promise<ReturnResponse<resGetListArticle>> => {
  return API.get(`${url}/get-list-tin-top`, { ...params }) as any;
};

export const getDetailArticleService = (
  articleId: string
): Promise<ReturnResponse<ARTICLE_MODEL>> => {
  return API.get(`${url}/detailArticle/${articleId}`) as any;
};

export const createArticleService = (
  payload: IReqCreateArticle
): Promise<ReturnResponse<ARTICLE_MODEL>> => {
  return API.postFormDataFile(`${url}/createArticle`, {
    body: { ...payload },
  }) as any;
};

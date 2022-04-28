import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import { ARTICLE_MODEL } from '@/models/Article.model';
import {
  createArticleService,
  getDetailArticleService,
  getListArticleService,
  getListTopArticleService,
} from '@/services/apis/Article';
import {
  IParamGetArticle,
  IReqCreateArticle,
} from '@/services/apis/Article/Article.interface';
import { defaultRegistry } from 'react-sweet-state';
import { State } from '.';
import { Store } from '../Auth';

type Actions = { setState: any; getState: () => State; dispatch: any };
const authInstance = defaultRegistry.getStore(Store);

export const getListArticleAsync =
  (params: Partial<IParamGetArticle>) =>
  async ({ getState, setState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await getListArticleService(params);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          article: {
            ...getState().article,
            list: result.data.data,
            total: result.data.total,
            isOver: result.data.isOver,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const loadMoreArticleAsync =
  (params: Partial<IParamGetArticle>) =>
  async ({ getState, setState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await getListArticleService(params);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        const currentList = [...getState().article.list, ...result.data.data];
        console.log(`currentList`, currentList);
        setState({
          ...getState(),
          article: {
            ...getState().article,
            list: currentList,
            total: result.data.total,
            isOver: result.data.isOver,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getListTopArticleAsync =
  (params: Partial<IParamGetArticle>) =>
  async ({ getState, setState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await getListTopArticleService(params);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          topArticle: {
            ...getState().article,
            list: result.data.data,
            total: result.data.total,
            isOver: result.data.isOver,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getDetailArticleAsync =
  (articleId: string) =>
  async ({ getState, setState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await getDetailArticleService(articleId);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          articleDetail: result.data,
        });
        return true;
      }
    }
    // notifyError(result.message);
    return false;
  };

export const createArticleAsync = (payload: IReqCreateArticle) => async () => {
  authInstance.actions.setAppLoading(true);
  const result = await createArticleService(payload);
  authInstance.actions.setAppLoading(false);
  if (result.error !== undefined) {
    if (!result.error) {
      notifySuccess('Tạo bài viết thành công.');
      return true;
    }
  }
  notifyError(result.message);
  return false;
};

export const setDetailArticle =
  (article: ARTICLE_MODEL | undefined) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      articleDetail: article,
    });
  };

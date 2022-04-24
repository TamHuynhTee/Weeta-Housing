import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
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
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const getListArticleAsync =
  (params: Partial<IParamGetArticle>) =>
  async ({ getState, setState }: Actions) => {
    const result = await getListArticleService(params);
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
    console.log(params);
    const result = await getListArticleService(params);
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
    const result = await getListTopArticleService(params);
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
    const result = await getDetailArticleService(articleId);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          articleDetail: result.data,
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const createArticleAsync = (payload: IReqCreateArticle) => async () => {
  const result = await createArticleService(payload);
  if (result.error !== undefined) {
    if (!result.error) {
      notifySuccess('Tạo bài viết thành công.');
      return true;
    }
  }
  notifyError(result.message);
  return false;
};

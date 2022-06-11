import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import { ARTICLE_MODEL } from '@/models/Article.model';
import {
  createArticleService,
  deleteArticleService,
  getDetailArticleService,
  getListArticleService,
  getListTopArticleService,
  updateArticleService,
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
  async ({ getState, setState, dispatch }: Actions) => {
    dispatch(setLoadingArticle(true));
    const result = await getListArticleService(params);
    dispatch(setLoadingArticle(false));
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
        // console.log(`currentList`, currentList);
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
  async ({ getState, setState, dispatch }: Actions) => {
    dispatch(setLoadingTOPArticle(true));
    const result = await getListTopArticleService(params);
    dispatch(setLoadingTOPArticle(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          topArticle: {
            ...getState().topArticle,
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

export const createArticleAsync =
  (payload: IReqCreateArticle) =>
  async ({ setState, getState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await createArticleService(payload);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        notifySuccess('Tạo bài viết thành công');
        setState({ ...getState(), articleDetail: result.data });
        return { success: true, data: result.data };
      }
    }
    notifyError(result.message);
    return { success: false, data: undefined };
  };

export const updateArticleAsync =
  (articleId: string, payload: Partial<IReqCreateArticle>) =>
  async ({ setState, getState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await updateArticleService(articleId, payload);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        notifySuccess('Đã cập nhật bài viết');
        setState({ ...getState(), articleDetail: result.data });
        return { success: true, data: result.data };
      }
    }
    notifyError(result.message);
    return { success: false, data: undefined };
  };

export const deleteArticleAsync =
  (articleId: string) =>
  async ({ setState, getState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await deleteArticleService(articleId);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        notifySuccess('Đã xóa bài viết');
        setState({ ...getState(), articleDetail: result.data });
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

const setLoadingArticle =
  (loadingArticle: boolean) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      article: {
        ...getState().article,
        loading: loadingArticle,
      },
    });
  };

const setLoadingTOPArticle =
  (loadingArticle: boolean) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      topArticle: {
        ...getState().topArticle,
        loading: loadingArticle,
      },
    });
  };

export const setStoreArticleProperties =
  (overrideProperties: Partial<State>) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      ...overrideProperties,
    });
  };

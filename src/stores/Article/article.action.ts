import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import {
  createArticleService,
  getListArticleService,
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

import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import { createArticleService } from '@/services/apis/Article';
import { IReqCreateArticle } from '@/services/apis/Article/Article.interface';

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

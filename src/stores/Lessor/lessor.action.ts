import { notifyError } from '@/helpers/toast.helpers';
import { getLessorArticleService } from '@/services/apis/Lessor';
import { IReqGetLessorArticles } from '@/services/apis/Lessor/Lessor.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const getLessorArticleAsync =
  (params: Partial<IReqGetLessorArticles>) =>
  async ({ setState, getState }: Actions) => {
    const result = await getLessorArticleService(params);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          articles: {
            list: result.data.articles,
            total: result.data.total,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

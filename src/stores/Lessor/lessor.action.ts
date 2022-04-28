import { notifyError } from '@/helpers/toast.helpers';
import { getLessorArticleService } from '@/services/apis/Lessor';
import { IReqGetLessorArticles } from '@/services/apis/Lessor/Lessor.interface';
import { defaultRegistry } from 'react-sweet-state';
import { State } from '.';
import { Store } from '../Auth';

type Actions = { setState: any; getState: () => State; dispatch: any };
const authInstance = defaultRegistry.getStore(Store);

export const getLessorArticleAsync =
  (params: Partial<IReqGetLessorArticles>) =>
  async ({ setState, getState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await getLessorArticleService(params);
    authInstance.actions.setAppLoading(false);
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

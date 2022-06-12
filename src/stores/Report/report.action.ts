import { ENUM_TYPE_REASON } from '@/constants/base.constants';
import { notifyError } from '@/helpers/toast.helpers';
import { getReasonService } from '@/services/apis/Reason';
import { IParamGetReason } from '@/services/apis/Reason/Reason.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const getListReasonAsync =
  (params: Partial<IParamGetReason>) =>
  async ({ setState, getState }: Actions) => {
    // dispatch(setLoadingReason(true));
    const result = await getReasonService(params);
    // dispatch(setLoadingReason(false));
    if (result.error !== undefined) {
      if (!result.error) {
        if (params.type && params.type === ENUM_TYPE_REASON.ARTICLE) {
          setState({
            ...getState(),
            reasonsArticle: {
              list: result.data.reasons,
              total: result.data.total,
            },
          });
        }
        if (params.type && params.type === ENUM_TYPE_REASON.LESSOR) {
          setState({
            ...getState(),
            reasonsLessor: {
              list: result.data.reasons,
              total: result.data.total,
            },
          });
        }
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

// const setLoadingReason = (loading: boolean) => (actions: Actions) => {
//   actions.setState({
//     ...actions.getState(),
//     reasons: {
//       ...actions.getState().reasons,
//       loading: loading,
//     },
//   });
// };

import { ENUM_MESSAGE_MODE } from '@/constants/base.constants';
import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import { getConversationService } from '@/services/apis/Conversation';
import { getConversationMessagesService } from '@/services/apis/Message';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const getConversationAsync =
  ({ limit = 10, page }: { limit: number; page: number }) =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingConversation(true));
    const resData = await getConversationService({ limit, page });
    dispatch(setLoadingConversation(false));
    if (resData.error !== undefined) {
      if (!resData.error) {
        setState({
          ...getState(),
          conversations: {
            list: resData.data.data,
            isOver: resData.data.isOver,
            total: resData.data.total,
            page: 1,
          },
        });
      }
    }
  };

export const getConversationMessagesAsync =
  ({
    conversationId,
    limit = 10,
    page,
  }: {
    conversationId: string;
    limit: number;
    page: number;
  }) =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingMessage(true));
    const resData = await getConversationMessagesService({
      conversationId,
      limit,
      page,
    });
    dispatch(setLoadingMessage(false));
    if (resData.error !== undefined) {
      if (!resData.error) {
        setState({
          ...getState(),
          messages: {
            list: resData.data.data,
            isOver: resData.data.isOver,
            total: resData.data.total,
            skip: 1,
          },
        });
      }
    }
  };

export const setConversationDetail =
  (conversation: CONVERSATION_MODEL | undefined) =>
  ({ setState, getState }: Actions) => {
    setState({ ...getState(), conversationDetail: conversation });
  };

export const setMessageDetail =
  (message: MESSAGE_MODEL | undefined) =>
  ({ setState, getState }: Actions) => {
    setState({ ...getState(), messageDetail: message });
  };

export const setConversationMode =
  (mode: ENUM_MESSAGE_MODE) =>
  ({ setState, getState }: Actions) => {
    setState({ ...getState(), mode: mode });
  };

const setLoadingConversation =
  (loadingConversation: boolean) => (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      conversations: {
        ...actions.getState().conversations,
        loading: loadingConversation,
      },
    });
  };

const setLoadingMessage = (loadingMessage: boolean) => (actions: Actions) => {
  actions.setState({
    ...actions.getState(),
    messages: { ...actions.getState().messages, loading: loadingMessage },
  });
};

import { ENUM_MESSAGE_MODE } from '@/constants/base.constants';
import { notifyError } from '@/helpers/toast.helpers';
import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import {
  createConversationService,
  getConversationService,
} from '@/services/apis/Conversation';
import {
  createConversationMessageService,
  editConversationMessageService,
  getConversationMessagesService,
  removeConversationMessageService,
} from '@/services/apis/Message';
import {
  ICreateConversationMessage,
  IEditConversationMessage,
} from '@/services/apis/Message/Message.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const createConversationAsync =
  (payload: { senderId: string; receiverId: string }) =>
  async ({ setState, getState }: Actions) => {
    const resData = await createConversationService(payload);
    if (resData.error !== undefined) {
      if (!resData.error) {
        setState({
          ...getState(),
          conversationDetail: resData.data,
          mode: ENUM_MESSAGE_MODE.CHAT,
        });
        return { success: true, data: resData.data };
      }
      return { success: false, data: undefined };
    }
    return { success: false, data: undefined };
  };

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
            page: 2,
          },
        });
      }
    }
  };

export const loadMoreConversationMessagesAsync =
  ({
    conversationId,
    limit = 10,
    page,
  }: {
    conversationId: string;
    limit: number;
    page: number;
  }) =>
  async ({ setState, getState }: Actions) => {
    const resData = await getConversationMessagesService({
      conversationId,
      limit,
      page,
    });
    if (resData.error !== undefined) {
      if (!resData.error) {
        const fetchData = resData.data.data;
        const listData = [...getState().messages.list].concat(fetchData);
        setState({
          ...getState(),
          messages: {
            list: listData,
            isOver: resData.data.isOver,
            total: resData.data.total,
            page: page + 1,
          },
        });
      }
    }
  };

export const createConversationMessageAsync =
  (payload: ICreateConversationMessage) =>
  async ({}: Actions) => {
    const result = await createConversationMessageService(payload);
    if (result.error !== undefined) {
      if (!result.error) return { success: true, data: result.data };
      return { success: false, data: undefined };
    } else {
      notifyError('Có lỗi xảy ra, vui lòng thử lại');
      return { success: false, data: undefined };
    }
  };

export const editConversationMessageAsync =
  ({
    messageId,
    payload,
  }: {
    messageId: string;
    payload: IEditConversationMessage;
  }) =>
  async ({ getState, setState }: Actions) => {
    const result = await editConversationMessageService(messageId, payload);
    if (result.error !== undefined) {
      if (!result.error) {
        //   Code re-render edited message here
        const listMessage = [...getState().messages.list];
        const index = listMessage.findIndex(
          (ele) => ele._id === result.data._id
        );
        listMessage[index] = result.data;
        setState({
          ...getState(),
          mode: ENUM_MESSAGE_MODE.CHAT,
          messageDetail: undefined,
          messages: {
            ...getState().messages,
            list: listMessage,
          },
        });
        return { success: true, data: result.data };
      }
      return { success: false, data: undefined };
    } else {
      notifyError('Có lỗi xảy ra, vui lòng thử lại');
      return { success: false, data: undefined };
    }
  };

export const removeConversationMessageAsync =
  ({ messageId }: { messageId: string }) =>
  async ({ setState, getState }: Actions) => {
    const result = await removeConversationMessageService(messageId);

    if (result.error !== undefined) {
      if (!result.error) {
        //   Code re-render removed message here
        const listMessage = [...getState().messages.list];
        const index = listMessage.findIndex(
          (ele) => ele._id === result.data._id
        );
        listMessage[index] = result.data;
        setState({
          ...getState(),
          messageDetail: undefined,
          messages: {
            ...getState().messages,
            list: listMessage,
          },
        });
        return { success: true, data: result.data };
      }
      return { success: false, data: undefined };
    } else {
      notifyError('Có lỗi xảy ra, vui lòng thử lại');
      return { success: false, data: undefined };
    }
  };

export const updateMessageInConversation =
  (message: MESSAGE_MODEL) =>
  ({ setState, getState }: Actions) => {
    const listMessage = [...getState().messages.list];
    const index = listMessage.findIndex((ele) => ele._id === message._id);
    listMessage[index] = message;
    setState({
      ...getState(),
      messages: {
        ...getState().messages,
        list: listMessage,
      },
    });
  };

export const addMessageToConversation =
  (message: MESSAGE_MODEL) =>
  ({ setState, getState }: Actions) => {
    const currentListConversation = [...getState().conversations.list];
    const thisConversation = getState().conversationDetail;
    //   Check which conversations these messages belong to
    // 1 ****** Belongs to current conversation ******
    if (thisConversation && message.conversation === thisConversation._id) {
      const currentListMessage = [...getState().messages.list];
      //   Check message with id exists
      const isMessageExisted = currentListMessage.findIndex(
        (item) => item._id === message._id
      );
      if (isMessageExisted === -1) {
        // add message to list message
        currentListMessage.unshift(message);
        // update conversation list
        thisConversation.latestMessage = message;
        thisConversation.latestMessage.isSeen = 1;
        const thisConversationIndex = currentListConversation.findIndex(
          (ele) => ele._id === thisConversation._id
        );
        3;
        if (thisConversationIndex > -1) {
          currentListConversation.splice(thisConversationIndex, 1);
          currentListConversation.unshift(thisConversation);
        }
        setState({
          ...getState(),
          conversations: {
            ...getState().conversations,
            list: currentListConversation,
          },
          messages: {
            ...getState().messages,
            list: currentListMessage,
          },
        });
      }
      // 2 ****** Belongs to other conversations ******
    } else if (
      thisConversation === undefined ||
      (thisConversation && message.conversation !== thisConversation._id)
    ) {
      // kiếm cái conv của mess đó
      const foundConversation = currentListConversation.find(
        (item) => item._id === message.conversation
      );
      if (foundConversation) {
        foundConversation.latestMessage = message;
        // cộng số tn chưa seen vào
        const amountOfNotSeenMess =
          foundConversation.amountOfNotSeenMess !== undefined
            ? foundConversation.amountOfNotSeenMess
            : 0;
        foundConversation.amountOfNotSeenMess = amountOfNotSeenMess + 1;
        const foundConversationIndex = currentListConversation.findIndex(
          (ele) => ele._id === foundConversation._id
        );
        // dua len dau conversation
        if (foundConversationIndex > -1) {
          currentListConversation.splice(foundConversationIndex, 1);
          currentListConversation.unshift(foundConversation);
        }
        // update rồi setState
        setState({
          ...getState(),
          conversations: {
            ...getState().conversations,
            list: currentListConversation,
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

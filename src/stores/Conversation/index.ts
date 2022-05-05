import { ENUM_MESSAGE_MODE } from '@/constants/base.constants';
import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getConversationAsync,
  setConversationDetail,
  setMessageDetail,
  setConversationMode,
  getConversationMessagesAsync,
} from './conversation.action';
import { selector } from './conversation.selector';

export type State = {
  conversations: {
    list: Array<CONVERSATION_MODEL>;
    isOver: boolean;
    total: number;
    page: number;
    loading: boolean;
  };
  messages: {
    list: Array<MESSAGE_MODEL>;
    isOver: boolean;
    total: number;
    page: number;
    loading: boolean;
  };
  conversationDetail: CONVERSATION_MODEL | undefined;
  messageDetail: MESSAGE_MODEL | undefined;
  mode: ENUM_MESSAGE_MODE;
};

const initialState: State = {
  conversations: {
    list: [],
    isOver: false,
    total: 0,
    page: 1,
    loading: false,
  },
  messages: {
    list: [],
    isOver: false,
    total: 0,
    page: 1,
    loading: false,
  },
  conversationDetail: undefined,
  messageDetail: undefined,
  mode: ENUM_MESSAGE_MODE.CHAT,
};

const actions = {
  getConversationAsync,
  setConversationDetail,
  setMessageDetail,
  setConversationMode,
  getConversationMessagesAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useConversation = createHook(Store, { selector: selector });

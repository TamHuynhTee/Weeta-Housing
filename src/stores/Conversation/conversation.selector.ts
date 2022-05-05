import { State } from './index';
export const selector = (state: State) => {
  return {
    conversations: state.conversations,
    messages: state.messages,
    conversationDetail: state.conversationDetail,
    messageDetail: state.messageDetail,
    mode: state.mode,
  };
};

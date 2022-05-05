import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import { GET_LIST_RESULT } from '@/services/interfaces';

export type resGetListConversation = GET_LIST_RESULT & {
  data: Array<CONVERSATION_MODEL>;
};

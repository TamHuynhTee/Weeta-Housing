import { MESSAGE_MODEL } from '@/models/Messages.model';
import { GET_LIST_RESULT } from '@/services/interfaces';

export type resConversationMessage = GET_LIST_RESULT & {
  data: Array<MESSAGE_MODEL>;
};

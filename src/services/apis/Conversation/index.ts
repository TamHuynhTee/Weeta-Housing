import { RouteApi } from '@/constants/routeApi.constants';
import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { resGetListConversation } from './Conversation.type';

const url = RouteApi.conversation;

export const getConversationService = ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<ReturnResponse<resGetListConversation>> => {
  return API.get(`${url}/get-list-conversations`, { page, limit }) as any;
};

export const createConversationService = (payload: {
  senderId: string;
  receiverId: string;
}): Promise<ReturnResponse<CONVERSATION_MODEL>> => {
  return API.post(`${url}/${url}`, {
    body: { ...payload },
  }) as any;
};

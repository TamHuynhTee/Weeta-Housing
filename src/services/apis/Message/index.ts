import { RouteApi } from '@/constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { resConversationMessage } from './Message.type';

const url = RouteApi.message;

export const getConversationMessagesService = async ({
  conversationId,
  limit,
  page,
}: {
  conversationId: string;
  limit: number;
  page: number;
}): Promise<ReturnResponse<resConversationMessage>> => {
  return API.get(`${url}/${url}/${conversationId}`, { page, limit });
};

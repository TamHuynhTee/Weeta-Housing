import { RouteApi } from '@/constants/routeApi.constants';
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

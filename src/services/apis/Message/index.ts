import { RouteApi } from '@/constants/routeApi.constants';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import {
  ICreateConversationMessage,
  IEditConversationMessage,
} from './Message.interface';
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

export const createConversationMessageService = async (
  payload: ICreateConversationMessage
): Promise<ReturnResponse<MESSAGE_MODEL>> => {
  return API.post(`${url}/${url}`, { body: { ...payload } });
};

export const editConversationMessageService = async (
  messageId: string,
  payload: IEditConversationMessage
): Promise<ReturnResponse<MESSAGE_MODEL>> => {
  return API.put(`${url}/${url}/${messageId}`, { body: { ...payload } });
};

export const removeConversationMessageService = async (
  messageId: string
): Promise<ReturnResponse<MESSAGE_MODEL>> => {
  return API.patch(`${url}/${url}/remove/${messageId}`);
};

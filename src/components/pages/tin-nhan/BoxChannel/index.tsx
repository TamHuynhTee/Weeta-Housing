import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import { CONVERSATION_LIMIT } from '@/pages/tin-nhan';
import { useConversation } from '@/stores/Conversation';
import React from 'react';
import CardChannel from './CardChannel';
import styles from './styles.module.css';
import socketService from '@/services/sockets/baseSocket';
import { ENUM_MESSAGE_MODE } from '@/constants/base.constants';
import { useAuth } from '@/stores/Auth';
import BoxConversationSkeleton from '@/components/common/Skeleton/BoxChannelSkeleton';
import SendMessageSocket from '@/services/sockets/MessageSocket';
import { useRouter } from 'next/router';

const BoxChannel = () => {
  const [stateConversation, actionConversation] = useConversation();
  const router = useRouter();
  const receiverId = router.query.receiverId as string;

  const [stateAuth] = useAuth();

  React.useEffect(() => {
    if (receiverId && stateAuth.authId) {
      (async () => {
        if (socketService.socket && socketService.socket.connected) {
          const result = await actionConversation.createConversationAsync({
            senderId: stateAuth.authId,
            receiverId,
          });
          if (result.success) {
            SendMessageSocket.joinRoomCSS(socketService.socket, {
              senderId: stateAuth.authId,
              receiverId: receiverId as string,
            });

            await actionConversation.getConversationMessagesAsync({
              conversationId: result.data?._id || '',
              limit: 10,
              page: 1,
            });
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    receiverId,
    stateAuth.authId,
    socketService.socket,
    socketService.socket?.connected,
  ]);

  React.useEffect(() => {
    actionConversation.getConversationAsync({
      limit: CONVERSATION_LIMIT,
      page: 1,
    });
  }, [actionConversation]);

  const handleSelectConversation = async (
    id: string,
    conversation: CONVERSATION_MODEL
  ) => {
    if (stateConversation.conversationDetail) {
      if (stateConversation.conversationDetail._id === id) return;
    }
    if (socketService.socket && socketService.socket.connected) {
      actionConversation.setConversationDetail(conversation);
      actionConversation.setConversationMode(ENUM_MESSAGE_MODE.CHAT);
      actionConversation.setMessageDetail(undefined);
      const senderId = conversation.members.find(
        (item) => item._id === stateAuth.authId
      )?._id;
      const receiverId = conversation.members.find(
        (item) => item._id !== stateAuth.authId
      )?._id;

      SendMessageSocket.joinRoomCSS(socketService.socket, {
        senderId: senderId as string,
        receiverId: receiverId as string,
      });

      await actionConversation.getConversationMessagesAsync({
        conversationId: id,
        limit: 10,
        page: 1,
      });
      //   if (stateConversation.conversationDetail) {
      //     SendMessageSocket.leaveRoomCSS(socketService.socket, {
      //       conversationID: stateConversation.conversationDetail._id,
      //     });
      //   }
    }
  };

  return (
    <div className="w-full h-full col-span-2 bg-green-100 rounded-tl-[20px] rounded-bl-[20px] py-[20px]">
      <div className="px-[20px]">
        <p className="text-[24px] text-baseColor font-bold leading-[50px]">
          Tin nhắn
        </p>
        <form className="flex items-center my-[10px]">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm cuộc trò chuyện"
              className="w-full h-[40px] bg-white px-[20px] py-[5px] rounded-[20px] outline-none"
            />
          </div>
          <button
            className="h-[20px] w-[20px] bg-transparent ml-[10px]"
            type="submit"
          >
            <img
              src="/icons/ic_search.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        </form>
      </div>
      <div className={`h-[calc(100%-120px)] ${styles.scrollbarChannel}`}>
        {stateConversation.conversations.loading ? (
          <BoxConversationSkeleton total={3} />
        ) : stateConversation.conversations.total > 0 ? (
          stateConversation.conversations.list.map((conversation, index) => {
            return (
              <CardChannel
                key={index}
                authId={stateAuth.auth?._id as string}
                handleSelect={handleSelectConversation}
                data={conversation}
                isSelected={
                  stateConversation.conversationDetail?._id === conversation._id
                }
              />
            );
          })
        ) : (
          <p className="text-center px-[20px] text-gray-400">
            Chưa có cuộc trò chuyện nào
          </p>
        )}
      </div>
    </div>
  );
};

export default BoxChannel;

import { ENUM_MESSAGE_MODE } from '@/constants/base.constants';
import { isShowTimeMessageBetween } from '@/helpers/base.helpers';
import Hook from '@/hooks/Conversations/conversations.hook';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import { FORM_MESSAGE_NAME, MESSAGE_LIMIT } from '@/pages/tin-nhan';
import { useAuth } from '@/stores/Auth';
import { useConversation } from '@/stores/Conversation';
import React from 'react';
import { useForm } from 'react-hook-form';
import BoxChatHeader from './BoxChatHeader';
import CardGuessMessageChat from './CardMessage/CardGuessMessageChat';
import CardMyMessageChat from './CardMessage/CardMyMessageChat';
import CardMessageTime from './CardMessage/CardTimeMessage';
import styles from './styles.module.css';
import socketService from '@/services/sockets/baseSocket';
import InputChat from '@/components/common/InputChat';

const BoxChat = () => {
  const [stateConversation, actionConversation] = useConversation();
  const [stateAuth] = useAuth();

  const { register, handleSubmit, setValue } = useForm();

  const { refLoadMoreMessages, loadMoreMessages } = Hook.useLoadMoreMessages();

  const { handleChatMessage } = Hook.useMessageActions({
    setValue,
    nameValue: FORM_MESSAGE_NAME,
  });

  React.useEffect(() => {
    if (loadMoreMessages) {
      if (stateConversation.conversationDetail) {
        actionConversation.loadMoreConversationMessagesAsync({
          conversationId: stateConversation.conversationDetail._id as string,
          page: stateConversation.messages.page,
          limit: MESSAGE_LIMIT,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionConversation, loadMoreMessages]);

  const renderMessageBox = (
    message: MESSAGE_MODEL,
    index: number,
    nextMessage: MESSAGE_MODEL
  ) => {
    if (message.sender === stateAuth.authId)
      return (
        <div key={index}>
          {!nextMessage && <CardMessageTime message={message} />}
          {nextMessage !== undefined &&
            isShowTimeMessageBetween(
              new Date(message.createdAt).getTime(),
              new Date(nextMessage.createdAt).getTime()
            ) && <CardMessageTime message={message} />}

          <CardMyMessageChat
            message={message}
            key={index}
            //   onEditSelect={() => {
            //     setValue(nameMessage, message.data);
            //     actionConversation.setMessageDetail(message);
            //     actionConversation.setConversationMode(ENUM_MESSAGE_MODE.EDIT);
            //   }}
            //   onRemoveSelect={() => {
            //     openDeleteMessageModal();
            //     actionConversation.setMessageDetail(message);
            //   }}
          />
        </div>
      );
    else
      return (
        <div key={index}>
          {!nextMessage && <CardMessageTime message={message} />}
          {nextMessage !== undefined &&
            isShowTimeMessageBetween(
              new Date(message.createdAt).getTime(),
              new Date(nextMessage.createdAt).getTime()
            ) && <CardMessageTime message={message} />}

          <CardGuessMessageChat
            sender={
              stateConversation.conversationDetail?.members.filter(
                (e) => e._id === message.sender
              )[0]
            }
            message={message}
            key={index}
            //   onResponseSelect={() => {
            //     actionConversation.setMessageDetail(message);
            //     actionConversation.setConversationMode(ENUM_MESSAGE_MODE.REPLY);
            //   }}
          />
        </div>
      );
  };

  const handleSendMessage = (data: any) => {
    const { message } = data;
    const dataMessage = {
      message: message,
    };
    if (socketService.socket && socketService.socket.connected) {
      const messageStr = message.trim();
      if (!messageStr) return;
      if (stateConversation.mode === ENUM_MESSAGE_MODE.CHAT) {
        handleChatMessage(dataMessage, stateAuth.authId);
      }
      //   else if (stateConversation.mode === ENUM_MESSAGE_MODE.EDIT) {
      //     handleEditMessage(data);
      //   }
    }
  };

  return (
    <React.Fragment>
      <div className="w-full h-full col-span-2 rounded-tr-[20px] rounded-br-[20px]">
        {stateConversation.conversationDetail ? (
          <>
            <BoxChatHeader />
            <div className={`${styles.scrollbar}`}>
              {stateConversation.messages.list.map((item, index) =>
                renderMessageBox(
                  item,
                  index,
                  stateConversation.messages.list[index + 1] as MESSAGE_MODEL
                )
              )}

              {!stateConversation.messages.isOver && (
                <p
                  className="flex justify-center text-14px text-green-600 mt-[10px]"
                  ref={refLoadMoreMessages}
                >
                  Đang tải
                </p>
              )}
            </div>
            <form
              className="w-full h-[60px] px-[20px] pt-[5px] pb-[10px] flex justify-between items-center gap-x-3"
              autoComplete="off"
              onSubmit={handleSubmit(handleSendMessage)}
            >
              <InputChat
                registerForm={register(FORM_MESSAGE_NAME)}
                name={FORM_MESSAGE_NAME}
                className={`${styles.txtMessage}  `}
                placeholder="Soạn tin nhắn..."
                setValue={setValue}
              />
              <button
                type="submit"
                className="w-[32px] h-[33px] cursor-pointer"
              >
                <img
                  src="/icons/ic_sendMess.png"
                  className="w-full h-full object-contain"
                  alt="icon"
                />
              </button>
            </form>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-300">Hãy chọn cuộc trò chuyện để bắt đầu</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BoxChat;

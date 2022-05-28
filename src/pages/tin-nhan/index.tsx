import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxChannel from '@/components/pages/tin-nhan/BoxChannel';
import Authentication from '@/HOC/auth.hoc';
import { useConversation } from '@/stores/Conversation';
import React from 'react';
import socketService from '@/services/sockets/baseSocket';
import SendMessageSocket from '@/services/sockets/MessageSocket';
import BoxChat from '@/components/pages/tin-nhan/BoxChat';
import ContainerModal from '@/components/common/ContainerModal';
import Hook from '@/hooks/Conversations/conversations.hook';
import ModalDeleteMessage from '@/components/pages/tin-nhan/Modal/ModalDeleteMessage';

export const CONVERSATION_LIMIT = 10;
export const MESSAGE_LIMIT = 10;
export const FORM_MESSAGE_NAME = 'message';

const ChatPage = () => {
  const [, actionConversation] = useConversation();

  const {
    stateShowDeleteMessageModal,
    openDeleteMessageModal,
    closeDeleteMessageModal,
  } = Hook.useShowDeleteMessageModal();

  //   Chat listening events
  React.useEffect(() => {
    if (socketService.socket && socketService.socket.connected) {
      SendMessageSocket.onJoinRoomSSC(socketService.socket, (data) => {
        console.log('join room', data);
      });
      //   SendMessageSocket.onLeaveRoomSSC(socketService.socket, () => {
      //     // console.log('leave room', data);
      //   });
      SendMessageSocket.onSendMessageSSC(socketService.socket, (data) => {
        // console.log('receive mess', data);
        actionConversation.addMessageToConversation(data.data);
      });
      SendMessageSocket.onEditMessageSSC(socketService.socket, (data) => {
        // console.log('update mess', data);
        actionConversation.updateMessageInConversation(data.data);
      });
      SendMessageSocket.onRemoveMessageSSC(socketService.socket, (data) => {
        // console.log('delete mess', data);
        actionConversation.updateMessageInConversation(data.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketService.socket, socketService.socket?.connected]);

  return (
    <React.Fragment>
      <LayoutCommon title="Tin nhắn của tôi" isVisibleFooter={false}>
        <div className="w-full h-[calc(100vh-80px)] px-[50px] py-[20px]">
          <div className="w-full h-full grid grid-cols-7 shadow-[rgba(99,99,99,0.2)_0_2px_8px_0] rounded-[20px]">
            {/* Box channel */}
            <BoxChannel />
            {/* Box chat */}
            <div className="w-full h-full col-span-5 bg-white rounded-tr-[20px] rounded-br-[20px]">
              <BoxChat openDeleteMessageModal={openDeleteMessageModal} />
            </div>
          </div>
          <ContainerModal
            isVisible={stateShowDeleteMessageModal}
            closeModal={() => {
              closeDeleteMessageModal();
            }}
          >
            <ModalDeleteMessage closeModal={closeDeleteMessageModal} />
          </ContainerModal>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

// Home.layout = LayoutCommon;

export default Authentication(ChatPage, { requiredLogin: true });

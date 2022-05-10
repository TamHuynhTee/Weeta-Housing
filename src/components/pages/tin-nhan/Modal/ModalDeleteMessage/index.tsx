import { MESSAGE_MODEL } from '@/models/Messages.model';
import React from 'react';
import SendMessageSocket from '@/services/sockets/MessageSocket';
import { useConversation } from '@/stores/Conversation';
import socketService from '../../../../../services/sockets/baseSocket';
interface Prop {
  closeModal: () => void;
}
const ModalDeleteMessage = (props: Prop) => {
  const { closeModal } = props;

  const [stateConversation, actionConversation] = useConversation();

  const handleCancelDelete = () => {
    closeModal();
    actionConversation.setMessageDetail(undefined);
  };

  const handleConfirmDelete = async () => {
    if (socketService.socket && socketService.socket.connected) {
      const result = await actionConversation.removeConversationMessageAsync({
        messageId: stateConversation.messageDetail?._id as string,
      });
      if (result.success) {
        SendMessageSocket.removeMessageCSS(
          socketService.socket,
          result.data as MESSAGE_MODEL
        );
      }
      closeModal();
    }
  };

  return (
    <div className="px-[27px] py-[30px] bg-white rounded-[20px] md:w-[400px] xs:w-[300px] w-[460px]">
      <p className="text-20px font-semibold text-black-300">Thu hồi tin nhắn</p>
      <p className="text-16px font-normal text-black-300 mt-[16px]">
        Bạn chắc muốn thu hồi tin nhắn này chứ?
      </p>
      <div className="mt-[30px] flex justify-end items-center gap-x-[20px] xs:mt-[20px] xs:flex-col-reverse xs:gap-y-[10px]">
        <button
          className="button-outline-primary min-w-[140px] xs:w-full"
          onClick={handleCancelDelete}
        >
          Hủy
        </button>
        <button
          className="button-primary min-w-[140px] xs:w-full"
          onClick={handleConfirmDelete}
        >
          Thu hồi
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteMessage;

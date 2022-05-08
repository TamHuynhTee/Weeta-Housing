import { ENUM_MESSAGE_MODE } from '@/constants/base.constants';
import { useConversation } from '@/stores/Conversation';
import React from 'react';
import useInView from '../useInView';
import socketService from '@/services/sockets/baseSocket';
import SendMessageSocket from '@/services/sockets/MessageSocket';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import { notifyError } from '@/helpers/toast.helpers';
import { ICreateConversationMessage } from '@/services/apis/Message/Message.interface';

// const useShowConversation = (role: ROLE) => {
//   const [stateConverse, actionConverse] = useConversation();

//   const handleSearchConversation = useDebounce(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       batch(() => {
//         const value = e.target.value;
//         actionConverse.searchConversationAsync({ role: role, search: value });
//       });
//     },
//     300
//   );

//   return {
//     stateConverse,
//     handleSearchConversation,
//   };
// };

const useLoadMoreConversations = () => {
  const refLoadMoreConversations = React.useRef<HTMLParagraphElement>(null);
  const loadMoreConversations = useInView(refLoadMoreConversations, {
    threshold: 0.15,
    rootMargin: '-10px',
    root: null,
  });
  return {
    refLoadMoreConversations,
    loadMoreConversations,
  };
};

const useLoadMoreMessages = () => {
  const refLoadMoreMessages = React.useRef<HTMLParagraphElement>(null);
  const loadMoreMessages = useInView(refLoadMoreMessages, {
    threshold: 0.15,
    rootMargin: '-10px',
    root: null,
  });
  return {
    refLoadMoreMessages,
    loadMoreMessages,
  };
};

// const useShowDeleteConversationModal = () => {
//   const [
//     stateShowDeleteConversationModal,
//     setStateShowDeleteConversationModal,
//   ] = React.useState(false);

//   const openDeleteConversationModal = () => {
//     setStateShowDeleteConversationModal(true);
//   };

//   const closeDeleteConversationModal = () => {
//     setStateShowDeleteConversationModal(false);
//   };

//   return {
//     stateShowDeleteConversationModal,
//     openDeleteConversationModal,
//     closeDeleteConversationModal,
//   };
// };
// const useShowUpdateConversationModal = () => {
//   const [
//     stateShowUpdateConversationModal,
//     setStateShowUpdateConversationModal,
//   ] = React.useState(false);

//   const openUpdateConversationModal = () => {
//     setStateShowUpdateConversationModal(true);
//   };

//   const closeUpdateConversationModal = () => {
//     setStateShowUpdateConversationModal(false);
//   };

//   return {
//     stateShowUpdateConversationModal,
//     openUpdateConversationModal,
//     closeUpdateConversationModal,
//   };
// };
// const useShowDeleteMessageModal = () => {
//   const [stateShowDeleteMessageModal, setStateShowDeleteMessageModal] =
//     React.useState(false);

//   const openDeleteMessageModal = () => {
//     setStateShowDeleteMessageModal(true);
//   };

//   const closeDeleteMessageModal = () => {
//     setStateShowDeleteMessageModal(false);
//   };

//   return {
//     stateShowDeleteMessageModal,
//     openDeleteMessageModal,
//     closeDeleteMessageModal,
//   };
// };

// const useShowImageMessageModal = () => {
//   const [stateShowImageMessageModal, setStateShowImageMessageModal] =
//     React.useState(false);

//   const openShowImageMessageModal = () => {
//     setStateShowImageMessageModal(true);
//   };

//   const closeShowImageMessageModal = () => {
//     setStateShowImageMessageModal(false);
//   };

//   return {
//     stateShowImageMessageModal,
//     openShowImageMessageModal,
//     closeShowImageMessageModal,
//   };
// };

const useMessageActions = ({
  setValue,
  nameValue,
}: {
  setValue: (key: string, value: unknown) => void;
  nameValue: string;
}) => {
  const [stateConversation, actionConversation] = useConversation();

  const handleChatMessage = async (
    data: { message: string },
    sender: string
  ) => {
    if (socketService.socket && socketService.socket.connected) {
      // dispatch(setLoadingMessage(true));
      const idRoom = stateConversation.conversationDetail?._id as string;

      const payload: ICreateConversationMessage = {
        conversation: idRoom,
        text: data.message,
        sender,
      };

      //   if (role === ROLE.EXPERT) payload.expertSender = sender;
      //   else if (role === ROLE.USER) payload.userSender = sender;

      setValue(nameValue, '');

      const result = await actionConversation.createConversationMessageAsync(
        payload
      );

      if (result.success) {
        SendMessageSocket.sendMessageCSS(
          socketService.socket,
          result.data as MESSAGE_MODEL
        );

        actionConversation.addMessageToConversation(
          result.data as MESSAGE_MODEL
        );
      } else {
        notifyError('Lỗi gửi tin nhắn');
      }
    }
  };

  //   const handleEditMessage = async (data: { message: string }) => {
  //     if (socketService.socket && socketService.socket.connected) {
  //       const payload: IEditConversationMessage = {
  //         field: 'data',
  //         value: data.message,
  //       };
  //       const result = await actionConversation.editConversationMessageAsync({
  //         messageId: stateConversation.messageDetail?._id || '',
  //         payload,
  //       });
  //       if (result.success) {
  //         SendMessageSocket.editMessageCSS(
  //           socketService.socket,
  //           result.data as MESSAGE_MODEL
  //         );
  //         setValue(nameValue, '');
  //         actionConversation.setConversationMode(ENUM_MESSAGE_MODE.CHAT);
  //       }
  //     }
  //   };

  return {
    handleChatMessage,
    // handleEditMessage,
  };
};

// const useConversationActions = () => {
//   const [stateConversation, actionConversation] = useConversation();

//   const handleSeenConversationMessages = async ({
//     conversationId,
//   }: {
//     conversationId: string;
//   }) => {
//     const conversation = [...stateConversation.conversations].find(
//       (item) => item._id === conversationId
//     );
//     if (conversation) {
//       if (
//         conversation.amountOfNotSeenMess !== undefined &&
//         conversation.amountOfNotSeenMess > 0
//       ) {
//         const result = await actionConversation.seenAllConversationMessageAsync(
//           {
//             conversationId: conversationId,
//           }
//         );

//         if (result) {
//           conversation.latestMessage.isSeen = 1;
//           conversation.amountOfNotSeenMess = 0;
//           actionConversation.setConversation(conversation);
//         }
//       }
//     }
//   };

//   return { handleSeenConversationMessages };
// };

const Hook = {
  useLoadMoreMessages,
  useLoadMoreConversations,
  useMessageActions,
};

export default Hook;

import { formatChatMessageTime } from '@/helpers/base.helpers';
import { useClickOutside } from '@/hooks/useClickOutSide';
import { CONVERSATION_MEMBER } from '@/models/Conversations.model';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import React from 'react';
import styles from './styles.module.css';

interface Prop {
  message?: MESSAGE_MODEL;
  ref?: React.Ref<any>;
  sender: CONVERSATION_MEMBER | undefined;
  onResponseSelect?: () => void;
}

const CardGuessMessageChat = (props: Prop) => {
  const {
    message = {} as MESSAGE_MODEL,
    sender,
    onResponseSelect = () => {
      return;
    },
  } = props;

  const [tooltip, setTooltip] = React.useState(false);

  const renderAvatar = () => {
    return sender?.avatar || '/images/avatar.jpg';
  };

  const domNode = useClickOutside(() => {
    if (tooltip) setTooltip(false);
  });

  const closeTooltip = () => setTooltip(false);

  const handleResponseMessage = () => {
    onResponseSelect();
    closeTooltip();
  };

  return (
    <div className={`${styles.rowAvatar} mt-[15px]`}>
      <div className={`w-full h-[45px] rounded-[50%] overflow-hidden`}>
        <img
          src={renderAvatar()}
          className="w-full h-full object-cover"
          alt="thumbnail"
        />
      </div>
      {!message.isDelete ? (
        <>
          <div
            className="max-w-full rounded-md pl-[20px] pr-[20px] relative"
            title={formatChatMessageTime(message.createdAt)}
          >
            <div
              className={`absolute w-[10px] h-[10px] right-[-5px] cursor-pointer top-[50%] translate-y-[-50%] ${styles.guess_message_tooltip}`}
              onClick={() => setTooltip(!tooltip)}
            >
              <img
                src="/icons/ic_3_dots.png"
                className="rotate-90"
                alt="tooltip"
              />
            </div>
            <div
              className={`shadow-md ${
                !tooltip ? 'hidden' : ''
              } absolute z-20 top-[50%] translate-y-[-50%] right-[-130px] bg-white rounded-[5px] py-[7px] px-[7px] min-w-[100px]`}
              ref={domNode}
            >
              <ul>
                <li
                  className="hover:bg-green-200 px-[10px] text-[14px] cursor-pointer rounded-[5px]"
                  onClick={handleResponseMessage}
                >
                  Phản hồi
                </li>
              </ul>
            </div>

            {message.text ? (
              <div className="bg-green-200 inline-block rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px] pt-[18px] pb-[18px] pl-[18px] pr-[18px]">
                <span
                  className={`text-16px text-black-100 break-all leading-[22px]`}
                >
                  {message.text}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <div className="pt-[20px] pb-[16px] pl-[21px] pr-[19px] w-full bg-white border border-gray-300 rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px] ml-[20px]">
          <p className="text-16px text-gray-300 italic">
            Tin nhắn đã được thu hồi
          </p>
        </div>
      )}
    </div>
  );
};

export default CardGuessMessageChat;

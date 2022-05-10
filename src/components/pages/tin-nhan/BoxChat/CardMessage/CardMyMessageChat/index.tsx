import { formatChatMessageTime } from '@/helpers/base.helpers';
import { useClickOutside } from '@/hooks/useClickOutSide';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import React from 'react';
import styles from './styles.module.css';

interface Prop {
  message?: MESSAGE_MODEL;
  onEditSelect?: () => void;
  onRemoveSelect?: () => void;
}

const CardMyMessageChat = (props: Prop) => {
  const {
    message = {} as MESSAGE_MODEL,
    onEditSelect = () => {
      return;
    },
    onRemoveSelect = () => {
      return;
    },
  } = props;

  const [tooltip, setTooltip] = React.useState(false);

  const domNode = useClickOutside(() => {
    if (tooltip) setTooltip(false);
  });

  const closeTooltip = () => setTooltip(false);

  const handleEditMessage = () => {
    onEditSelect();
    closeTooltip();
  };
  const handleRemoveMessage = () => {
    onRemoveSelect();
    closeTooltip();
  };

  return (
    <>
      <div
        className={`flex flex-row-reverse w-full mt-[15px] ${styles.my_message_container}`}
      >
        <div className="max-w-[60%]">
          {!message.isDelete ? (
            <>
              <div
                className="text-right relative px-[20px] w-full rounded-md"
                title={formatChatMessageTime(message.createdAt)}
              >
                {message.text ? (
                  <div className="bg-[#ffeba3] inline-block relative rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px] p-[18px]">
                    <span
                      className={`text-16px block text-black-100 break-all whitespace-pre-line`}
                    >
                      {message.text}
                    </span>
                  </div>
                ) : (
                  ''
                )}

                <div
                  className={`absolute w-[10px] h-[10px] left-[-5px] cursor-pointer top-[50%] translate-y-[-50%] ${styles.my_message_tooltip}`}
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
                  } absolute z-20 top-[50%] translate-y-[-50%] left-[-130px] bg-white rounded-[5px] py-[7px] px-[7px] min-w-[100px]`}
                  ref={domNode}
                >
                  <ul>
                    <li
                      className="hover:bg-green-200 px-[10px] text-[14px] cursor-pointer rounded-[5px]"
                      onClick={handleEditMessage}
                    >
                      Chỉnh sửa
                    </li>
                    <li
                      className="hover:bg-green-200 px-[10px] text-[14px] cursor-pointer rounded-[5px]"
                      onClick={handleRemoveMessage}
                    >
                      Thu hồi
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="text-right relative px-[20px] w-full rounded-md">
              <div className="pt-[20px] pb-[16px] pl-[21px] pr-[29px] w-full bg-white border border-gray-300 rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                <p className="text-16px text-gray-300 italic">
                  Tin nhắn đã được thu hồi
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardMyMessageChat;

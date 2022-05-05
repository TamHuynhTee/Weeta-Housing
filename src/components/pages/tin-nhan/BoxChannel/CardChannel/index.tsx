import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { CONVERSATION_MODEL } from '@/models/Conversations.model';
import React from 'react';

type Props = {
  isSelected: boolean;
  authId: string;
  data: CONVERSATION_MODEL;
  handleSelect: (id: string, conversation: CONVERSATION_MODEL) => void;
};

const CardChannel = (props: Props) => {
  const { isSelected, data, authId, handleSelect } = props;
  //   const [stateConversation] = useConversation();

  const theOtherMember = data.members.filter((e) => e._id !== authId)[0];

  const setCurrentConversation = React.useCallback(
    function () {
      handleSelect(data._id, data);
    },
    [handleSelect, data]
  );

  return (
    <div
      className={`w-full px-[10px] grid grid-cols-5 gap-x-[10px] h-[80px] cursor-pointer border-b ${
        isSelected && 'bg-white !cursor-default !border-none'
      }`}
      onClick={setCurrentConversation}
    >
      <div className="col-span-4 flex items-center">
        <div className="w-[50px] h-[50px] rounded-[50%] mr-[10px]">
          <img
            src={theOtherMember?.avatar || DEFAULT_AVATAR}
            className="w-full h-full rounded-[50%]"
            alt=""
          />
        </div>
        <div className="flex-1">
          <p className="max_line-1 font-bold text-[18px]">
            {theOtherMember?.fullname}
          </p>
          <p className="max_line-1 font-normal text-[16px]">
            Tôi rất không thích thái độ của cậu nhé
          </p>
        </div>
      </div>
      <div className="col-span-1 flex">
        <p className="text-gray-400 text-[12px] self-center">Thứ năm</p>
      </div>
    </div>
  );
};

export default CardChannel;

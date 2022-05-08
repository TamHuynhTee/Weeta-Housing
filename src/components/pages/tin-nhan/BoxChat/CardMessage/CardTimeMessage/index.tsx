import { formatChatMessageTime } from '@/helpers/base.helpers';
import { MESSAGE_MODEL } from '@/models/Messages.model';
import React from 'react';

interface Prop {
  message?: MESSAGE_MODEL;
}

const CardMessageTime = (props: Prop) => {
  const { message = {} as MESSAGE_MODEL } = props;
  return (
    <div className="w-full my-[18px]">
      <p className="text-[12px] leading-[16px] text-grey-700 text-center">
        {formatChatMessageTime(message.createdAt)}
      </p>
    </div>
  );
};

export default CardMessageTime;

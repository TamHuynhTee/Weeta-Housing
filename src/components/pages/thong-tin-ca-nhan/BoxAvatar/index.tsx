import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { useAuth } from '@/stores/Auth';
import React from 'react';

type Props = {
  openModal: () => void;
};

const BoxMenuAvatar = ({ openModal }: Props) => {
  const [stateAuth] = useAuth();

  return (
    <div className="w-full grid place-items-center">
      <label htmlFor="avatar">
        <div className="w-[100px] h-[100px] relative">
          <div
            className="absolute left-0 right-0 overflow-hidden rounded-[50%] w-full h-full cursor-pointer"
            onClick={openModal}
          >
            <div className="w-[100px] h-[100px] object-cover">
              <img
                src={DEFAULT_AVATAR}
                alt="avatar"
                className="w-full h-full object-cover rounded-[100%]"
              />
            </div>
          </div>
        </div>
      </label>

      <p className="mt-[16px] text-[20px] text-black-100 font-semibold">
        {stateAuth.auth?.fullname}
      </p>
    </div>
  );
};

export default BoxMenuAvatar;

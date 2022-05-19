import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { ACCOUNT_MODEL } from '@/models/Account.model';
import Link from 'next/link';
import React from 'react';

type Props = {
  data: ACCOUNT_MODEL | undefined;
};

const WidgetLessor = (props: Props) => {
  const { data } = props;
  return (
    <div className="sticky top-[100px] min-h-[200px] w-full rounded-[10px] px-[20px] py-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
      <div className="flex items-center gap-x-3">
        <div className="h-[60px] w-[60px] rounded-[50%]">
          <img
            src={data?.avatar ? data.avatar : DEFAULT_AVATAR}
            className="w-full h-full object-cover rounded-[50%]"
            alt="avatar"
          />
        </div>
        <div className="h-full">
          <div className="flex items-center gap-x-3">
            <Link href={'#!'}>
              <a className="text-black text-[20px] font-bold hover:text-baseColor">
                {data?.fullname}
              </a>
            </Link>
            <div className="h-[24px] w-[24px] select-none">
              <img
                src={
                  data?.isAutoApproved
                    ? '/icons/ic_verified.png'
                    : '/icons/ic_failed_cross.png'
                }
                className='className="w-full h-full object-cover rounded-[50%]"'
                alt="verification"
                title={
                  data?.isAutoApproved
                    ? 'Nhà môi giới đã xác thực CNMD'
                    : 'Nhà môi giới chưa xác thực CMND'
                }
              />
            </div>
          </div>
          <p>{data?.email}</p>
        </div>
      </div>
      <div className="mt-[20px]">
        <button className="button-primary w-full">Liên hệ</button>
        <button className="button-outline-primary w-full mt-[10px]">
          Nhắn tin
        </button>
      </div>
    </div>
  );
};

export default WidgetLessor;

import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { ACCOUNT_MODEL } from '@/models/Account.model';
import { useArticle } from '@/stores/Article';
import { useAuth } from '@/stores/Auth';
import Link from 'next/link';
import React from 'react';

type Props = {
  data: ACCOUNT_MODEL | undefined;
  openReportModal: () => void;
};

const WidgetLessor = (props: Props) => {
  const { data, openReportModal } = props;
  const [stateAuth] = useAuth();

  return (
    <div className="sticky top-[100px] w-full rounded-[10px] px-[20px] py-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
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
                    ? 'Nhà môi giới đã xác thực CMND'
                    : 'Nhà môi giới chưa xác thực CMND'
                }
              />
            </div>
          </div>
          <p>{data?.email}</p>
        </div>
      </div>
      {stateAuth.authId !== data?._id && (
        <BoxLessorAction data={data} openReportModal={openReportModal} />
      )}
    </div>
  );
};

const BoxLessorAction = ({ data, openReportModal }: Props) => {
  const [showPhone, setShowPhone] = React.useState(false);
  const [stateArticle] = useArticle();

  return (
    <div className="mt-[20px]">
      <button
        className="button-primary flex items-center gap-x-[5px] w-full"
        onClick={() => setShowPhone(!showPhone)}
        disabled={!stateArticle.articleDetail?.isAvailable}
      >
        <span className="h-[20px] w-[20px] object-contain">
          <img src="/icons/ic_call.png" alt="image" />
        </span>
        Liên hệ:{' '}
        {showPhone
          ? data?.phoneNumber
          : `${data?.phoneNumber?.slice(0, -3)}xxx`}
      </button>
      <div className="grid grid-cols-2 gap-x-[10px] mt-[10px]">
        <Link href={`/tin-nhan?receiverId=${data?._id}`}>
          <a className="button-blue flex items-center gap-x-[5px] w-full">
            <span className="h-[20px] w-[20px] object-contain">
              <img src="/icons/ic_message.png" alt="image" />
            </span>
            Nhắn tin
          </a>
        </Link>
        <button
          onClick={openReportModal}
          className="button-red flex items-center gap-x-[5px] w-full"
        >
          <span className="h-[20px] w-[20px] object-contain">
            <img src="/icons/ic_report.png" alt="image" />
          </span>
          Báo cáo
        </button>
      </div>
    </div>
  );
};

export default WidgetLessor;

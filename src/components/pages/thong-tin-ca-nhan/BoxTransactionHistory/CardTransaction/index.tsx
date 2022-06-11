import {
  ENUM_PAYMENT_STATUS,
  ENUM_PAYMENT_TYPE,
  TYPE_MEMBER,
} from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import {
  MEMBER_TRANSACTION_MODEL,
  SERVICE_TRANSACTION_MODEL,
} from '@/models/Payment.model';
import dayjs from 'dayjs';
import Link from 'next/link';

const CardTransaction = ({
  data,
  type,
}: {
  data: MEMBER_TRANSACTION_MODEL & SERVICE_TRANSACTION_MODEL;
  type: ENUM_PAYMENT_TYPE;
}) => {
  return (
    <div
      className={`rounded-[10px] px-[20px] py-[10px] ${
        data.status === ENUM_PAYMENT_STATUS.SUCCESS
          ? 'bg-green-100'
          : 'bg-orange-100'
      } grid grid-cols-5 items-center`}
    >
      <div className="col-span-3">
        <p className="text-[20px] font-semibold">
          {type === ENUM_PAYMENT_TYPE.MEMBER_PACKAGE
            ? `THANH TOÁN GÓI THÀNH VIÊN ${
                TYPE_MEMBER[data.memberPackageName]?.name || ''
              }`
            : `THANH TOÁN GÓI DỊCH VỤ ${data.servicePackageName || ''}`}
        </p>
        <div className="mt-[10px] flex items-center gap-2">
          <div className="h-[20px] w-[20px]">
            <img
              src="/icons/ic_money.png"
              className="w-full h-full object-contain"
              alt="money"
            />
          </div>
          <span
            className={`font-semibold ${
              data.status === ENUM_PAYMENT_STATUS.SUCCESS
                ? 'text-baseColor'
                : 'text-orange-500'
            } text-[18px]`}
          >
            {formatMoney(data.transactionAmount || 0)} VND
          </span>
        </div>
        <div className="mt-[10px] flex items-center gap-2">
          <div className="h-[20px] w-[20px]">
            <img
              src="/icons/ic_payment.png"
              className="w-full h-full object-contain"
              alt="money"
            />
          </div>
          <span
            className={`font-semibold ${
              data.status === ENUM_PAYMENT_STATUS.SUCCESS
                ? 'text-baseColor'
                : 'text-orange-500'
            } text-[18px]`}
          >
            {data.paymentMethod}
          </span>
        </div>
      </div>
      <div className="col-span-2">
        <p
          className={`${
            data.status === ENUM_PAYMENT_STATUS.SUCCESS
              ? 'text-baseColor'
              : 'text-orange-500'
          } text-[20px] font-bold text-right`}
        >
          {data.status === ENUM_PAYMENT_STATUS.SUCCESS
            ? 'ĐÃ THANH TOÁN'
            : 'ĐANG XỬ LÝ'}
        </p>
        <p className="mt-[10px] text-[14px] leading-[27px] font-normal text-right">
          {dayjs(data.createdAt).format('DD-MM-YYYY HH:mm')}
        </p>
        <Link href={`#!`}>
          <a className="mt-[10px] text-[14px] leading-[27px] font-normal float-right">
            Chi tiết {'>'}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CardTransaction;

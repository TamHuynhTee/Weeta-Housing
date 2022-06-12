import LineHorizontal from '@/components/common/LineHorizontal';
import { ENUM_PAYMENT_STATUS } from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import {
  MEMBER_TRANSACTION_MODEL,
  SERVICE_TRANSACTION_MODEL,
} from '@/models/Payment.model';
import { useLessor } from '@/stores/Lessor';
import dayjs from 'dayjs';
import Link from 'next/link';

const ModalDetailTransaction = ({ closeModal }: { closeModal: () => void }) => {
  const [stateLessor] = useLessor();
  console.log(`stateLessor`, stateLessor.transactionDetail);
  const data = stateLessor.transactionDetail;

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[400px]">
      <p className="text-[20px] font-bold text-center mb-[16px] uppercase">
        Chi tiết hóa đơn
      </p>
      <LineHorizontal className="my-[20px]" />
      <div className="mb-[20px]">
        {data?.servicePackageName ? (
          <ServiceTransaction data={data} />
        ) : (
          <MemberTransaction data={data} />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="button-outline-primary-grey w-full col-span-2"
          onClick={closeModal}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

const ServiceTransaction = ({
  data,
}: {
  data: SERVICE_TRANSACTION_MODEL | undefined;
}) => {
  return (
    <div className="grid gap-y-[20px]">
      <RowPaymentData label="Thanh toán" data={`GÓI DỊCH VỤ`} />
      <RowPaymentData label="Gói" data={data?.servicePackageName} />
      <RowPaymentData
        label="Thanh toán lúc"
        data={dayjs(data?.createdAt).format('DD-MM-YYYY HH:mm')}
      />
      <RowPaymentData label="Thời hạn" data={`${data?.numOfDate} ngày`} />
      <RowPaymentData
        label="Gói hết hạn vào ngày"
        data={dayjs()
          .add(data?.numOfDate || 0, 'day')
          .format('DD-MM-YYYY')}
      />
      <div className="items-center grid grid-cols-2 gap-[10px]">
        <p className="font-semibold text-[18px]">Trạng thái</p>
        <p
          className={`${
            data?.status === ENUM_PAYMENT_STATUS.SUCCESS
              ? 'text-baseColor'
              : 'text-orange-500'
          } text-[20px] font-bold text-right`}
        >
          {data?.status === ENUM_PAYMENT_STATUS.SUCCESS
            ? 'ĐÃ THANH TOÁN'
            : 'ĐANG XỬ LÝ'}
        </p>
      </div>
      <div className="items-center grid grid-cols-2 gap-[10px]">
        <p className="font-semibold text-[18px]">Tổng thanh toán</p>
        <p className={`text-blue-500 text-[20px] font-bold text-right`}>
          {formatMoney(data?.transactionAmount || 0)} VND
        </p>
      </div>
      <div className="items-center grid grid-cols-2 gap-[10px]">
        <p className="font-semibold text-[18px]">Chi tiết bài viết</p>
        <Link href={`/bai-dang/${data?.articleId}`}>
          <a className={`cursor-pointer text-right`}>Chi tiết</a>
        </Link>
      </div>
    </div>
  );
};

const MemberTransaction = ({
  data,
}: {
  data: MEMBER_TRANSACTION_MODEL | undefined;
}) => {
  return (
    <div className="grid gap-y-[20px]">
      <RowPaymentData label="Thanh toán" data={`GÓI THÀNH VIÊN`} />
      <RowPaymentData label="Gói" data={data?.memberPackageName} />
      <RowPaymentData
        label="Thanh toán lúc"
        data={dayjs(data?.createdAt).format('DD-MM-YYYY HH:mm')}
      />
      <RowPaymentData label="Thời hạn" data={`1 tháng`} />
      <RowPaymentData
        label="Gói hết hạn vào ngày"
        data={dayjs().add(1, 'month').format('DD-MM-YYYY')}
      />
      <div className="items-center grid grid-cols-2 gap-[10px]">
        <p className="font-semibold text-[18px]">Trạng thái</p>
        <p
          className={`${
            data?.status === ENUM_PAYMENT_STATUS.SUCCESS
              ? 'text-baseColor'
              : 'text-orange-500'
          } text-[20px] font-bold text-right`}
        >
          {data?.status === ENUM_PAYMENT_STATUS.SUCCESS
            ? 'ĐÃ THANH TOÁN'
            : 'ĐANG XỬ LÝ'}
        </p>
      </div>
      <div className="items-center grid grid-cols-2 gap-[10px]">
        <p className="font-semibold text-[18px]">Tổng thanh toán</p>
        <p className={`text-blue-500 text-[20px] font-bold text-right`}>
          {formatMoney(data?.transactionAmount || 0)} VND
        </p>
      </div>
    </div>
  );
};

const RowPaymentData = ({
  label,
  data,
}: {
  label: string;
  data: string | undefined;
}) => {
  return (
    <div className="items-center grid grid-cols-2 gap-[10px]">
      <p className="font-semibold text-[18px]">{label}</p>
      <p className="text-right">{data}</p>
    </div>
  );
};

export default ModalDetailTransaction;

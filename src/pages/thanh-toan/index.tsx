import LineHorizontal from '@/components/common/LineHorizontal';
import LayoutCommon from '@/components/layout/LayoutCommon';
import {
  ENUM_PAYMENT_METHOD,
  ENUM_PAYMENT_TYPE,
  ENUM_PAYMENT_UNIT,
} from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import { notifyError } from '@/helpers/toast.helpers';
import Authentication from '@/HOC/auth.hoc';
import { paymentService } from '@/services/apis/Payment';
import {
  IReqPaymentArticle,
  IReqPaymentMember,
} from '@/services/apis/Payment/Payment.interface';
import { useAuth } from '@/stores/Auth';
import { usePayment } from '@/stores/Payment';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

const Payment = () => {
  const [stateAuth] = useAuth();
  const [statePayment, actionPayment] = usePayment();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = React.useState<ENUM_PAYMENT_METHOD>(
    ENUM_PAYMENT_METHOD.VNPAY
  );

  const renderPaymentName = `Gói ${
    statePayment.payment_type === ENUM_PAYMENT_TYPE.MEMBER_PACKAGE
      ? 'thành viên'
      : 'đăng tin'
  } ${
    statePayment.payment_type === ENUM_PAYMENT_TYPE.MEMBER_PACKAGE
      ? statePayment.payment_data?.packageMember?.memberPackageName
      : statePayment.payment_data?.packageArticle?.servicePackageName
  }`;

  const renderPaymentUnit = `${
    statePayment.payment_data?.unit === ENUM_PAYMENT_UNIT.MONTH
      ? 'tháng'
      : 'ngày'
  }`;

  React.useEffect(() => {
    if (!statePayment.payment_data) {
      router.back();
    }

    return () => {
      actionPayment.setPayment(undefined, undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statePayment.payment_data]);

  const handlePayment = async () => {
    if (statePayment.payment_data) {
      const payload: Partial<IReqPaymentArticle & IReqPaymentMember> = {
        type: statePayment.payment_type,
        prices: statePayment.payment_data.price,
      };
      if (statePayment.payment_type === ENUM_PAYMENT_TYPE.MEMBER_PACKAGE) {
        payload.memberPackageName =
          statePayment.payment_data.packageMember?.memberPackageName;
      }
      if (statePayment.payment_type === ENUM_PAYMENT_TYPE.SERVICE_PACKAGE) {
        payload.servicePackageName =
          statePayment.payment_data.packageArticle?.servicePackageName;
        payload.numOfDate = statePayment.payment_data.packageArticle?.numOfDate;
        payload.articleId = statePayment.payment_data.packageArticle?.articleId;
      }
      const result = await paymentService(payload);
      if (result) {
        window.location.href = result.data;
      } else notifyError('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <React.Fragment>
      <LayoutCommon title="Thanh toán">
        <div className="w-full px-[50px] py-[30px]">
          <div className="grid grid-cols-7 gap-[50px]">
            <div className="col-span-3 ">
              <p className="text-[32px] font-bold mb-[20px]">
                Chọn phương thức thanh toán
              </p>
              <div className="grid grid-rows-2 gap-[30px]">
                <CardPaymentType
                  //   name="paymentType"
                  method={ENUM_PAYMENT_METHOD.VNPAY}
                  banner="/images/img_banner_vnpay.png"
                  currentMethod={paymentMethod}
                  setCurrentMethod={setPaymentMethod}
                />
                <CardPaymentType
                  //   name="paymentType"
                  method={ENUM_PAYMENT_METHOD.MOMO}
                  banner="/images/img_banner_momo.png"
                  currentMethod={paymentMethod}
                  setCurrentMethod={setPaymentMethod}
                />
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <div className="border rounded-[10px] py-[20px] px-[30px] shadow">
                <p className="text-[24px] font-bold">Thông tin thanh toán</p>
                <div className="my-[20px]">
                  <LineHorizontal />
                </div>
                <div className="grid gap-y-[20px]">
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">Khách hàng</p>
                    <p className="text-right">{stateAuth.auth?.fullname}</p>
                  </div>
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">Thanh toán lúc</p>
                    <p className="text-right">
                      {dayjs().format('DD/MM/YYYY HH:mm')}
                    </p>
                  </div>
                  <LineHorizontal />
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">Loại gói</p>
                    <p className="text-right">
                      {statePayment.payment_type ===
                      ENUM_PAYMENT_TYPE.MEMBER_PACKAGE
                        ? 'Thành viên'
                        : 'Đăng tin'}
                    </p>
                  </div>
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">Tên gói</p>
                    <p className="text-right">{renderPaymentName}</p>
                  </div>
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">Loại thanh toán</p>
                    <p className="text-right">Online</p>
                  </div>
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">
                      Hình thức thanh toán
                    </p>
                    <p className="text-right">Ví {paymentMethod}</p>
                  </div>
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">
                      Đơn giá ({renderPaymentUnit})
                    </p>
                    <p className="text-right">
                      {formatMoney(statePayment.payment_data?.price || 0)} VND
                    </p>
                  </div>
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">Thời hạn</p>
                    <p className="text-right">
                      {statePayment.payment_data?.quantity || 0}{' '}
                      {renderPaymentUnit}
                    </p>
                  </div>
                  <div className="items-center grid grid-cols-2 gap-[10px]">
                    <p className="font-semibold text-[18px]">
                      Gói hết hạn vào ngày
                    </p>
                    <p className="text-right">
                      {dayjs()
                        .add(
                          statePayment.payment_data?.quantity || 0,
                          statePayment.payment_data?.unit
                        )
                        .format('DD/MM/YYYY')}
                    </p>
                  </div>
                </div>
                <div className="my-[20px]">
                  <LineHorizontal />
                </div>
                <div className="items-center grid grid-cols-2 gap-[10px]">
                  <p className="font-bold text-[24px]">Tổng cộng</p>
                  <p className="font-bold text-[20px] text-baseColor text-right">
                    {formatMoney(statePayment.payment_data?.prices || 0)} VND
                  </p>
                </div>
              </div>
              <button
                className="button-primary w-full mt-[20px]"
                onClick={handlePayment}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const CardPaymentType = ({
  //   name,
  method,
  banner,
  currentMethod,
  setCurrentMethod,
}: {
  //   name: string;
  banner: string;
  method: ENUM_PAYMENT_METHOD;
  currentMethod: ENUM_PAYMENT_METHOD;
  setCurrentMethod: React.Dispatch<React.SetStateAction<ENUM_PAYMENT_METHOD>>;
}) => {
  return (
    <label
      htmlFor={`payment_method_${method}`}
      className={`row-span-1 rounded-[10px] w-full cursor-pointer hover:shadow-md`}
      onClick={() => {
        if (method !== currentMethod) setCurrentMethod(method);
      }}
    >
      <div
        className={`border-2 rounded-[10px] p-[20px] ${
          currentMethod === method ? 'border-green-400' : ''
        }`}
      >
        <div className="flex items-center justify-around">
          {/* <input
            type="radio"
            name={name}
            id={`payment_method_${method}`}
            checked={currentMethod === method}
          /> */}
          <p className="font-bold text-[20px]">Ví {method}</p>
          <div className="h-[100px] w-[100px]">
            <img src={banner} alt={method} className="h-full w-full" />
          </div>
        </div>
      </div>
    </label>
  );
};

export default Authentication(Payment, { requiredLogin: true });

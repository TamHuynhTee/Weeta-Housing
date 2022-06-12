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
        // set cứng method
        paymentMethod: ENUM_PAYMENT_METHOD.VNPAY,
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
                  method={ENUM_PAYMENT_METHOD.VNPAY}
                  banner="/images/img_banner_vnpay.png"
                  currentMethod={paymentMethod}
                  setCurrentMethod={setPaymentMethod}
                />
                <CardPaymentType
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
                  <RowPaymentData
                    label="Khách hàng"
                    data={stateAuth.auth?.fullname}
                  />
                  <RowPaymentData
                    label="Thanh toán lúc"
                    data={dayjs().format('DD-MM-YYYY HH:mm')}
                  />
                  <LineHorizontal />
                  <RowPaymentData
                    label="Loại gói"
                    data={
                      statePayment.payment_type ===
                      ENUM_PAYMENT_TYPE.MEMBER_PACKAGE
                        ? 'Thành viên'
                        : 'Đăng tin'
                    }
                  />
                  <RowPaymentData label="Tên gói" data={renderPaymentName} />
                  <RowPaymentData label="Loại thanh toán" data={'Online'} />
                  <RowPaymentData
                    label="Hình thức thanh toán"
                    data={`Ví ${paymentMethod}`}
                  />
                  <RowPaymentData
                    label={`Đơn giá (${renderPaymentUnit})`}
                    data={`${formatMoney(
                      statePayment.payment_data?.price || 0
                    )} VND`}
                  />
                  <RowPaymentData
                    label="Thời hạn"
                    data={`${
                      statePayment.payment_data?.quantity || 0
                    } ${renderPaymentUnit}`}
                  />
                  <RowPaymentData
                    label="Gói hết hạn vào ngày"
                    data={dayjs()
                      .add(
                        statePayment.payment_data?.quantity || 0,
                        statePayment.payment_data?.unit
                      )
                      .format('DD-MM-YYYY')}
                  />
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

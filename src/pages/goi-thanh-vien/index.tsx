import Breadcrumb from '@/components/common/BreadCrumb';
import LineHorizontal from '@/components/common/LineHorizontal';
import LayoutCommon from '@/components/layout/LayoutCommon';
import {
  ENUM_PAYMENT_TYPE,
  ENUM_PAYMENT_UNIT,
  ENUM_TYPE_MEMBER,
  MEMBER_PACKAGES,
  ROLE,
  TYPE_MEMBER,
} from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import { notifySuccess } from '@/helpers/toast.helpers';
import Authentication from '@/HOC/auth.hoc';
import { MEMBER_PACKAGE_CARD_MODEL } from '@/models/MemberPackage.model';
import { paymentService } from '@/services/apis/Payment';
import {
  IPayment,
  IReqPaymentMember,
} from '@/services/apis/Payment/Payment.interface';
import { useAuth } from '@/stores/Auth';
import { usePayment } from '@/stores/Payment';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

const ServicePackage = () => {
  const [stateAuth] = useAuth();
  const [, actionPayment] = usePayment();
  const [selectedPackage, setSelectedPackage] =
    React.useState<MEMBER_PACKAGE_CARD_MODEL>();

  const auth = stateAuth.auth;
  // Warning
  const changeWarning = auth
    ? auth.articleUsed < auth.articleTotal &&
      auth.memberPackage !== selectedPackage?.memberPackage
    : false;

  const router = useRouter();

  const currentPackage = auth?.memberPackage;

  React.useEffect(() => {
    if (auth) {
      setSelectedPackage(
        MEMBER_PACKAGES.find(
          (item) => item.memberPackage === auth.memberPackage
        )
      );
    }
  }, [auth]);

  const handleCancel = () => {
    router.back();
  };

  const handleRegisterLessor = () => {
    router.push('/nhap-so-dien-thoai');
  };

  const handleToPayment = async () => {
    if (selectedPackage) {
      if (selectedPackage.memberPackage === ENUM_TYPE_MEMBER.FREE) {
        const payload: IReqPaymentMember = {
          type: ENUM_PAYMENT_TYPE.MEMBER_PACKAGE,
          memberPackageName: selectedPackage.memberPackage,
          prices: 0,
        };
        const result = await paymentService(payload);
        if (result) {
          router.push('/');
          notifySuccess('Bạn đã chuyển gói thành công');
        }
        return;
      }
      const payload: IPayment = {
        type: ENUM_PAYMENT_TYPE.MEMBER_PACKAGE,
        packageMember: {
          memberPackageName: selectedPackage.memberPackage,
        },
        prices: selectedPackage.price * 1,
        price: selectedPackage.price,
        quantity: 1,
        unit: ENUM_PAYMENT_UNIT.MONTH,
      };
      actionPayment.setPayment(ENUM_PAYMENT_TYPE.MEMBER_PACKAGE, payload);
      router.push('/thanh-toan');
    }
  };

  return (
    <React.Fragment>
      <LayoutCommon title="Gói thành viên" isVisibleSearchBar>
        <div className="w-full min-h-[calc(100vh-80px)]">
          {stateAuth.role === ROLE.LESSOR ? (
            <div className="px-[50px] py-[30px]">
              <Breadcrumb
                arr_link={[
                  { href: '/', value: 'Weeta' },
                  { href: '/goi-thanh-vien', value: 'Gói thành viên' },
                ]}
              />
              <div className="my-[20px]">
                <p className="">
                  Gói hiện tại của bạn:{' '}
                  {stateAuth.auth?.memberPackage ? (
                    <span
                      className={`font-bold text-[${
                        TYPE_MEMBER[stateAuth.auth.memberPackage].color
                      }]`}
                    >
                      {TYPE_MEMBER[stateAuth.auth.memberPackage].name}
                    </span>
                  ) : (
                    ''
                  )}
                </p>
                <p className="max_line-1 my-[5px]">
                  Số bài viết trong tháng:{' '}
                  <span className="font-bold">
                    {stateAuth.auth?.articleUsed}/{stateAuth.auth?.articleTotal}
                  </span>
                </p>
                <p className="max_line-1 my-[5px]">
                  Gói được mua gần nhất lúc:{' '}
                  <span className="font-bold">
                    {dayjs().format('DD-MM-YYYY HH:mm')}
                  </span>
                </p>
                {stateAuth.auth?.memberPackage !== ENUM_TYPE_MEMBER.FREE && (
                  <p className="max_line-1 my-[5px]">
                    Gói hết hạn lúc:{' '}
                    <span className="font-bold">
                      {dayjs().add(1, 'month').format('DD-MM-YYYY HH:mm')}
                    </span>
                  </p>
                )}
              </div>
              <LineHorizontal />
              <div className="grid grid-cols-2 gap-[15px] my-[20px]">
                {MEMBER_PACKAGES.map((item, index) => (
                  // CARD
                  <label
                    key={index}
                    htmlFor={`member_package_${item.memberPackage}`}
                    className={`border-2 border-[rgb(230_230_230)] rounded-[6px] hover:shadow-md transition-[box-shadow_0.3s_ease_0s] cursor-pointer ${
                      selectedPackage?.memberPackage === item.memberPackage
                        ? 'border-green-400'
                        : ''
                    }
                    ${
                      currentPackage === item.memberPackage
                        ? 'bg-gray-100 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => {
                      if (currentPackage === item.memberPackage) return;
                      if (item.memberPackage !== selectedPackage?.memberPackage)
                        setSelectedPackage(item);
                    }}
                  >
                    <div className="py-[27px] px-[29px] w-full rounded-tl-[6px] rounded-tr-[6px]">
                      <div className="grid items-center grid-cols-5">
                        <p
                          className={`text-[22px] col-span-3 font-bold ${item.titleColor}`}
                        >
                          {item.packageName}
                        </p>
                        <p className="text-[22px] col-span-2 text-right">
                          {item.price > 0 ? (
                            <>
                              <span className="font-bold">
                                {formatMoney(item.price)} VND
                              </span>
                              /tháng
                            </>
                          ) : (
                            'Miễn phí'
                          )}
                        </p>
                      </div>
                      <div className="grid items-center grid-cols-12">
                        <div className="col-span-9">
                          <p className="mt-[10px]">
                            Tối đa {item.limitArticle} tin/tháng
                          </p>
                          <p className="mt-[10px]">{item.description}</p>
                        </div>
                        <div className="col-span-3 flex justify-center">
                          {currentPackage === item.memberPackage && (
                            <div className="py-[5px] px-[10px] font-bold rounded-full bg-orange-400 text-white">
                              Gói hiện tại
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="my-[20px]">
                {changeWarning && (
                  <p className="mb-[10px] text-red-500">
                    * Lưu ý: Gói hiện tại của bạn vẫn còn lượt đăng tin, thay
                    đổi gói thành viên sẽ ảnh hưởng đến số lượt đăng, nhấn đổi
                    gói nếu bạn muốn tiếp tục
                  </p>
                )}
                <input
                  type="button"
                  onClick={handleToPayment}
                  className="button-primary w-[128px] h-[40px]"
                  disabled={currentPackage === selectedPackage?.memberPackage}
                  value={'Đổi gói'}
                />
              </div>
            </div>
          ) : (
            <div className="px-[50px] py-[10px] flex justify-center h-full">
              <div className=" self-center">
                <p className="mt-[16px] text-[16px] font-semibold text-black-100 text-center">
                  Bạn cần đăng ký tài khoản môi giới để tiếp tục chức năng này.
                </p>
                <div className="mt-[16px] grid grid-cols-2 gap-2">
                  <button
                    className="button-outline-primary-grey w-full col-span-1"
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                  <button
                    className="button-primary w-full col-span-1"
                    onClick={handleRegisterLessor}
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(ServicePackage, { requiredLogin: false });

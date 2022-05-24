import LayoutCommon from '@/components/layout/LayoutCommon';
import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import Authentication from '@/HOC/auth.hoc';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const PaymentSuccess = () => {
  const router = useRouter();
  const type = router.query.type as ENUM_PAYMENT_TYPE;
  //   const paymentId = router.query.paymentId as string;
  const articleId = router.query.articleId as string;
  return (
    <React.Fragment>
      <LayoutCommon title="Thanh toán thành công" isVisibleSearchBar>
        <div className="w-full px-[50px] min-h-fit py-[50px] flex flex-col items-center ">
          <div className="h-[200px] w-[200px]">
            <img src="/icons/ic_success_payment.png" alt="success_payment" />
          </div>
          <p className="mt-[20px] text-[#0fa958] text-[20px] font-bold">
            THANH TOÁN THÀNH CÔNG
          </p>
          <p className="mt-[20px] text-[16px] font-normal">
            Bạn đã thanh toán thành công gói{' '}
            <span className="font-bold">
              {type === ENUM_PAYMENT_TYPE.MEMBER_PACKAGE
                ? 'thành viên'
                : 'dịch vụ'}
            </span>
            .
          </p>
          <div className="flex gap-3 mt-[20px]">
            <Link href={`#!`}>
              <a className="button-primary">Chi tiết hóa đơn</a>
            </Link>
            {type === ENUM_PAYMENT_TYPE.SERVICE_PACKAGE && (
              <Link href={`/bai-dang/${articleId}`}>
                <a className="button-outline-primary">Đến bài viết</a>
              </Link>
            )}
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(PaymentSuccess, { requiredLogin: true });

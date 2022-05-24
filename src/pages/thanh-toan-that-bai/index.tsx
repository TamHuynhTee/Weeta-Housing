import LayoutCommon from '@/components/layout/LayoutCommon';
import Authentication from '@/HOC/auth.hoc';
import Link from 'next/link';
import React from 'react';

const PaymentFailed = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Thanh toán thành công" isVisibleSearchBar>
        <div className="w-full px-[50px] min-h-fit py-[50px] flex flex-col items-center ">
          <div className="h-[200px] w-[200px]">
            <img src="/icons/ic_failed_payment.png" alt="success_payment" />
          </div>
          <p className="mt-[20px] text-[#ff3737] text-[20px] font-bold">
            THANH TOÁN THẤT BẠI
          </p>
          <p className="mt-[20px] text-[16px] font-normal">
            Bước thanh toán đã gặp sự cố, vui lòng liên hệ{' '}
            <strong>weetahousing2022@gmail.com</strong>
          </p>
          <div className="flex gap-3 mt-[20px]">
            <Link href={`/`}>
              <a className="button-primary">Về trang chủ</a>
            </Link>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(PaymentFailed, { requiredLogin: true });

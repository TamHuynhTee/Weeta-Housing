import LayoutCommon from '@/components/layout/LayoutCommon';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

const ServicePackage = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Gói thành viên" isVisibleSearchBar>
        <div className="w-full min-h-[calc(100vh-94px)] mb-[50px]">
          <div className="mx-auto max-w-[1140px]">
            <div className="py-[60px] text-center">
              <p className="text-[25px] font-bold mb-[10px]">
                Chọn gói thành viên của bạn
              </p>
              <p className="leading-[18px] mb-[30px]">
                Hãy chọn mua gói để đăng tin cho thuê hoặc bán nhà trọ.
              </p>
              <div>
                <span>Chọn thời gian mua</span>
                <select>
                  <option value="g">1 tháng</option>
                  <option value="g">3 tháng</option>
                  <option value="g">6 tháng</option>
                  <option value="g">9 tháng</option>
                  <option value="g">12 tháng</option>
                  <option value="g">24 tháng</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[15px]">
              <div className="border border-[rgb(230_230_230)] rounded-[6px] hover:shadow-[rgb(0_0_0_/_16%)_0px_0px_15px] transition-[box-shadow_0.3s_ease_0s] mx-[15px] flex-1">
                <div className="py-[27px] px-[29px] w-full rounded-tl-[6px] rounded-tr-[6px] bg-[rgb(247_247_247)]">
                  <p className="text-[22px] font-bold text-[rgb(17_182_102)]">
                    Tiết kiệm
                  </p>
                  <p className="mt-[10px]">
                    <span className="font-bold">100.000 VND</span>/tháng
                  </p>
                  <p className="mt-[10px]">Tối đa 20 tin</p>
                  <p className="mt-[10px]">Làm mới 1 lần/tin/ngày</p>
                </div>
                <div className="p-[30px] w-full">
                  <button className="button-primary">Chọn gói</button>
                </div>
              </div>
              <div className="border border-[rgb(230_230_230)] rounded-[6px] shadow-[rgb(0_0_0_/_16%)_0px_0px_15px] transition-[box-shadow_0.3s_ease_0s] mx-[15px] flex-1">
                <div className="py-[27px] px-[29px] w-full rounded-tl-[6px] rounded-tr-[6px] bg-[rgb(247_247_247)]">
                  <p className="text-[22px] font-bold text-[rgb(4_153_168)]">
                    Tiêu chuẩn
                  </p>
                  <p className="mt-[10px]">
                    <span className="font-bold">300.000 VND</span>/tháng
                  </p>
                  <p className="mt-[10px]">Tối đa 100 tin</p>
                  <p className="mt-[10px]">Làm mới 1 lần/tin/ngày</p>
                </div>
                <div className="p-[30px] w-full">
                  <button className="button-primary">Chọn gói</button>
                </div>
              </div>
              <div className="border border-[rgb(230_230_230)] rounded-[6px] hover:shadow-[rgb(0_0_0_/_16%)_0px_0px_15px] transition-[box-shadow_0.3s_ease_0s] mx-[15px] flex-1">
                <div className="py-[27px] px-[29px] w-full rounded-tl-[6px] rounded-tr-[6px] bg-[rgb(247_247_247)]">
                  <p className="text-[22px] font-bold text-[rgb(235_130_25)]">
                    Cao cấp
                  </p>
                  <p className="mt-[10px]">
                    <span className="font-bold">500.000 VND</span>/tháng
                  </p>
                  <p className="mt-[10px]">Tối đa 300 tin</p>
                  <p className="mt-[10px]">Làm mới 1 lần/tin/ngày</p>
                </div>
                <div className="p-[30px] w-full">
                  <button className="button-primary">Chọn gói</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(ServicePackage, { requiredLogin: false });

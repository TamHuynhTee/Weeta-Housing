import LayoutCommon from '@/components/layout/LayoutCommon';
import { useRouter } from 'next/router';
import React from 'react';

const SearchPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <React.Fragment>
      <LayoutCommon title="Tìm trọ" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <div className="w-full py-[20px]">
            {/* <HeaderSearch placeholder="Nhập từ khóa" /> */}
          </div>
          <div className="w-full">
            <div className="px-[20px] py-[10px] bg-baseColor text-white font-bold rounded-[3px]">
              Tin TOP
            </div>
            <div className="mt-[10px] grid grid-cols-5 gap-x-[10px]">
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
            </div>

            <div className="px-[20px] py-[10px] bg-slate-100 rounded-[3px] mt-[10px]">
              <span className="text-gray-500 font-bold">1 - 15</span> trong{' '}
              <span className="text-gray-500 font-bold">12.326</span> kết quả
            </div>
            <div className="mt-[10px] grid grid-cols-5 gap-[10px]">
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
            </div>
            <div className="mt-[20px] flex justify-center">
              <div className="w-10 h-10 border border-blue-2"></div>
              <div className="w-10 h-10 border border-blue-2"></div>
              <div className="w-10 h-10 border border-blue-2"></div>
              <div className="w-10 h-10 border border-blue-2"></div>
            </div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

// Home.layout = LayoutCommon;

export default SearchPage;

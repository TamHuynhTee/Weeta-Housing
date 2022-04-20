import LayoutCommon from '@/components/layout/LayoutCommon';
import { formatMoney } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import React from 'react';

const SearchPage = () => {
  const [stateArticle, actionArticle] = useArticle();
  //   console.log(router.query);

  React.useEffect(() => {
    actionArticle.getListArticleAsync({ page: 2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(stateArticle);

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
            <div className="mt-[10px] grid grid-cols-4 gap-[10px]">
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
              <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
            </div>

            <div className="px-[20px] py-[10px] bg-slate-100 rounded-[3px] mt-[10px]">
              <span className="text-gray-500 font-bold">1 - 15</span> trong{' '}
              <span className="text-gray-500 font-bold">
                {formatMoney(stateArticle.totalArticle)}
              </span>{' '}
              kết quả
            </div>
            <div className="mt-[10px] grid grid-cols-4 gap-[10px]">
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
              <button className="button-outline-primary">Tải thêm</button>
            </div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(SearchPage, { requiredLogin: false });

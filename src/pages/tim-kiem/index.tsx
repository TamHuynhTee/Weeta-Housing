import CardArticle from '@/components/common/CardArticle';
import LayoutCommon from '@/components/layout/LayoutCommon';
import { formatMoney } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { ARTICLE_MODEL } from '@/models/Article.model';
import { useArticle } from '@/stores/Article';
import React from 'react';

const SearchPage = () => {
  const [stateArticle, actionArticle] = useArticle();
  const [page, setPage] = React.useState(1);
  //   console.log(router.query);
  const query = {
    limit: 8,
  };

  React.useEffect(() => {
    actionArticle.getListArticleAsync(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    actionArticle.getListTopArticleAsync({
      page: 1,
      limit: 4,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMoreArticles = () => {
    actionArticle.loadMoreArticleAsync({ ...query, page: page + 1 });
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <React.Fragment>
      <LayoutCommon title="Tìm trọ" isVisibleSearchBar>
        <div className="w-full px-[50px] py-[10px]">
          <div className="w-full py-[20px]">
            {/* <HeaderSearch placeholder="Nhập từ khóa" /> */}
          </div>
          <div className="w-full grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <TopArticles list={stateArticle.topArticles.list} />

              <div className="px-[20px] py-[10px] bg-slate-100 rounded-[3px] mt-[10px]">
                <span className="text-gray-500 font-bold">1 - 15</span> trong{' '}
                <span className="text-gray-500 font-bold">
                  {formatMoney(stateArticle.articles.total)}
                </span>{' '}
                kết quả
              </div>
              <div className="mt-[10px] grid grid-cols-1 gap-[10px] col-span-2">
                {stateArticle.articles.list.map((item, index) => (
                  <CardArticle key={index} data={item} showVertical={false} />
                ))}
              </div>
              {!stateArticle.articles.isOver && (
                <div className="mt-[20px] flex justify-center">
                  <button
                    className="button-outline-primary"
                    onClick={handleLoadMoreArticles}
                  >
                    Tải thêm
                  </button>
                </div>
              )}
              <div className="mt-[10px] gap-[10px] col-span-1"></div>
            </div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const TopArticles = ({ list }: { list: Array<ARTICLE_MODEL> }) => {
  return (
    <>
      <div className="px-[20px] py-[10px] bg-baseColor text-white font-bold rounded-[3px]">
        Tin TOP
      </div>
      <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
        {list.map((item, index) => (
          <CardArticle data={item} key={index} />
        ))}
        {/* <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
        <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
        <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div>
        <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div> */}
        {/* <div className="w-full h-[200px] rounded-[3px] bg-slate-500"></div> */}
      </div>
    </>
  );
};

export default Authentication(SearchPage, { requiredLogin: false });

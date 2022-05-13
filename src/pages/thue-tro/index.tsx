import Breadcrumb from '@/components/common/BreadCrumb';
import CardArticle from '@/components/common/CardArticle';
import LayoutCommon from '@/components/layout/LayoutCommon';
import ArticleFilter from '@/components/pages/thue-tro/ArticleFilter';
import NoResults from '@/components/pages/thue-tro/NoResults';
import Pagination from '@/components/pages/thue-tro/Pagination';
import { DISTRICTS } from '@/constants/location.constants';
import { formatMoney } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const LIMIT = 10;

const SearchPage = () => {
  const [stateArticle, actionArticle] = useArticle();
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  const thisDay = new Date();

  const showRangeResult = `${
    stateArticle.articles.total > 0 ? (page - 1) * LIMIT + 1 : 0
  } - ${
    LIMIT * page > stateArticle.articles.total
      ? stateArticle.articles.total
      : LIMIT * page
  }`;

  React.useEffect(() => {
    actionArticle.getListArticleAsync({
      limit: LIMIT,
      'area[gte]': router.query.areaGTE as string,
      'area[lte]': router.query.areaLTE as string,
      'price[gte]': router.query.priceGTE as string,
      'price[lte]': router.query.priceLTE as string,
      'startDate[gte]': router.query.startDate as string,
      page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  //   React.useEffect(() => {
  //     actionArticle.getListTopArticleAsync({
  //       page: 1,
  //       limit: 4,
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   const handleLoadMoreArticles = () => {
  //     actionArticle.loadMoreArticleAsync({ ...query, page: page + 1 });
  //     setPage((currentPage) => currentPage + 1);
  //   };

  return (
    <React.Fragment>
      <LayoutCommon title="Tìm trọ" isVisibleSearchBar={false}>
        <div className="w-full px-[50px] py-[10px]">
          <ArticleFilter />
          {/* breadcrumb */}
          <Breadcrumb />
          <p className="text-[20px] font-bold my-[10px]">
            Thuê trọ tại TPHCM. Giá thuê mới nhất tháng{' '}
            {`${thisDay.getMonth() + 1}/${thisDay.getFullYear()}`}
          </p>
          <div className="w-full grid grid-cols-3 gap-4">
            <div className="col-span-2">
              {/* <TopArticles list={stateArticle.topArticles.list} /> */}

              <div className="px-[20px] py-[10px] bg-orange-100 rounded-[3px]">
                <span className="text-baseColor font-bold">
                  {showRangeResult}
                </span>{' '}
                trong{' '}
                <span className="text-baseColor font-bold">
                  {formatMoney(stateArticle.articles.total)}
                </span>{' '}
                kết quả
              </div>
              <div className="mt-[10px] grid grid-cols-1 gap-[10px] col-span-2">
                {stateArticle.articles.list.length > 0 ? (
                  stateArticle.articles.list.map((item, index) => (
                    <CardArticle key={index} data={item} showVertical={false} />
                  ))
                ) : (
                  <NoResults />
                )}
              </div>
              <Pagination
                total={stateArticle.articles.total}
                limit={LIMIT}
                currentPage={page}
              />
            </div>
            {/* side */}
            <div className="col-span-1">
              <div className="border border-gray-200 rounded-[3px] px-[20px] py-[10px] shadow-md">
                <p className="font-bold text-[18px] mb-[10px] text-center">
                  Khu vực quận
                </p>
                <ul className="list-disc list-inside">
                  {DISTRICTS.map((item, index) => (
                    <li className="hover:underline" key={index}>
                      <Link href={`/thue-tro/${item.value}`}>
                        <a className="text-black">{item.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

// const TopArticles = ({ list }: { list: Array<ARTICLE_MODEL> }) => {
//   return (
//     <>
//       <div className="px-[20px] py-[10px] bg-baseColor text-white font-bold rounded-[3px]">
//         Tin TOP
//       </div>
//       <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
//         {list.map((item, index) => (
//           <CardArticle data={item} key={index} />
//         ))}
//       </div>
//     </>
//   );
// };

export default Authentication(SearchPage, { requiredLogin: false });

import Breadcrumb from '@/components/common/BreadCrumb';
import CardArticle from '@/components/common/CardArticle';
import BoxSkeletonArticle from '@/components/common/Skeleton/CardArticleSkeleton';
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

export const ARTICLE_LIMIT = 10;

const SearchPage = () => {
  const [stateArticle, actionArticle] = useArticle();
  const router = useRouter();
  const { page, ...filter } = router.query as any;
  const currentPage = Number(router.query.page) || 1;

  const thisDay = new Date();

  const showRangeResult = `${
    stateArticle.articles.total > 0 ? (currentPage - 1) * ARTICLE_LIMIT + 1 : 0
  } - ${
    ARTICLE_LIMIT * currentPage > stateArticle.articles.total
      ? stateArticle.articles.total
      : ARTICLE_LIMIT * currentPage
  }`;

  React.useEffect(() => {
    actionArticle.getListArticleAsync({
      limit: ARTICLE_LIMIT,
      'area[gte]': router.query.areaGTE as string,
      'area[lte]': router.query.areaLTE as string,
      'price[gte]': router.query.priceGTE as string,
      'price[lte]': router.query.priceLTE as string,
      'startDate[gte]': router.query.startDate as string,
      page: currentPage,
      keyword: router.query.q as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  React.useEffect(() => {
    return () => {
      actionArticle.setStoreArticleProperties({
        article: { loading: false, list: [], isOver: false, total: 0 },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutCommon title="Tìm trọ" isVisibleSearchBar={false}>
        <div className="w-full px-[50px] py-[10px]">
          {/* breadcrumb */}
          <Breadcrumb
            arr_link={[
              { href: '/', value: 'Weeta' },
              { href: '/thue-tro', value: 'Thuê trọ TPHCM' },
            ]}
          />
          <ArticleFilter />

          <div className="flex items-center justify-between my-[10px]">
            <p className="text-[20px] leading-[34px] font-bold my-[10px]">
              Thuê trọ tại TPHCM. Giá thuê mới nhất tháng{' '}
              {`${thisDay.getMonth() + 1}/${thisDay.getFullYear()}`}.
            </p>
            {Object.values(filter).length > 0 && (
              <div
                className="bg-red-100 py-[5px] px-[10px] h-[34px] rounded-[50px] text-gray-600 cursor-pointer"
                onClick={() => router.push('/thue-tro')}
              >
                <span className="mr-[5px] text-rose-500">X</span> Xóa bộ lọc
              </div>
            )}
          </div>

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
                {stateArticle.articles.loading ? (
                  <BoxSkeletonArticle showVertical={false} count={3} />
                ) : stateArticle.articles.list.length > 0 ? (
                  stateArticle.articles.list.map((item, index) => (
                    <CardArticle key={index} data={item} showVertical={false} />
                  ))
                ) : (
                  <NoResults />
                )}
              </div>
              <Pagination
                total={stateArticle.articles.total}
                limit={ARTICLE_LIMIT}
                currentPage={currentPage}
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

export default Authentication(SearchPage, { requiredLogin: false });

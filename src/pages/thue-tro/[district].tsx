import Breadcrumb from '@/components/common/BreadCrumb';
import CardArticle from '@/components/common/CardArticle';
import LineHorizontal from '@/components/common/LineHorizontal';
import BoxSkeletonArticle from '@/components/common/Skeleton/CardArticleSkeleton';
import LayoutCommon from '@/components/layout/LayoutCommon';
import ArticleFilter from '@/components/pages/thue-tro/ArticleFilter';
import NoResults from '@/components/pages/thue-tro/NoResults';
import Pagination from '@/components/pages/thue-tro/Pagination';
import { DISTRICTS, WARDS } from '@/constants/location.constants';
import {
  formatMoney,
  getProvince,
  pushSearchQueries,
} from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { ARTICLE_MODEL } from '@/models/Article.model';
import { useArticle } from '@/stores/Article';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ARTICLE_LIMIT } from '.';

const DistrictSearchPage = () => {
  const [stateArticle, actionArticle] = useArticle();
  const router = useRouter();

  const { district, page, ...filter } = router.query as any;
  const currentPage = Number(router.query.page) || 1;
  const ward = router.query.ward as string;

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
      district: district as string,
      ward: ward,
      page: currentPage,
      keyword: router.query.q as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  React.useEffect(() => {
    actionArticle.getListTopArticleAsync({
      limit: 3,
      'area[gte]': router.query.areaGTE as string,
      'area[lte]': router.query.areaLTE as string,
      'price[gte]': router.query.priceGTE as string,
      'price[lte]': router.query.priceLTE as string,
      'startDate[gte]': router.query.startDate as string,
      district: district as string,
      ward: ward,
      keyword: router.query.q as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  React.useEffect(() => {
    return () => {
      actionArticle.setStoreArticleProperties({
        article: { loading: false, list: [], isOver: false, total: 0 },
        topArticle: { loading: false, list: [], isOver: false, total: 0 },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutCommon
        title={getProvince(Number(district))?.label}
        isVisibleSearchBar={false}
      >
        <div className="w-full px-[50px] py-[20px]">
          <Breadcrumb
            arr_link={[
              { href: '/', value: 'Weeta' },
              { href: '/thue-tro', value: 'Thuê trọ TPHCM' },
              {
                href: `/thue-tro/${district}`,
                value: `${getProvince(Number(district))?.label}`,
              },
            ]}
          />
          <ArticleFilter />
          <LineHorizontal className="!bg-gray-100" />
          <div className="flex items-center justify-between my-[10px]">
            <p className="text-[20px] leading-[34px] font-bold max_line-1">
              Thuê trọ tại {district ? getProvince(+district)?.label : 'TPHCM'}.
              Giá thuê mới nhất tháng{' '}
              {`${thisDay.getMonth() + 1}/${thisDay.getFullYear()}`}.
            </p>
            {Object.values(filter).length > 0 && (
              <div
                className="bg-red-100 py-[5px] px-[10px] h-[34px] rounded-[50px] text-gray-600 cursor-pointer"
                onClick={() => router.push(`/thue-tro/${district}`)}
              >
                <span className="mr-[5px] text-rose-500">X</span> Xóa bộ lọc
              </div>
            )}
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <TopArticles
                list={stateArticle.topArticles.list}
                loading={stateArticle.topArticles.loading}
              />

              <div className="px-[20px] py-[10px] bg-orange-100 rounded-[3px] mt-[10px]">
                <span className="text-baseColor font-bold">
                  {showRangeResult}
                </span>{' '}
                trong{' '}
                <span className="text-baseColor font-bold">
                  {formatMoney(stateArticle.articles.total)}
                </span>{' '}
                kết quả
              </div>
              <div className="mt-[10px] grid grid-cols-1 col-span-2">
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
              <LineHorizontal className="!bg-gray-100" />
              <Pagination
                total={stateArticle.articles.total}
                limit={ARTICLE_LIMIT}
                currentPage={currentPage}
              />
            </div>
            {/* side */}
            <div className="col-span-1">
              {/* ward */}
              <div className="border border-gray-200 rounded-[3px] px-[20px] py-[10px] shadow-md">
                <p className="font-bold text-[18px] mb-[10px] text-center">
                  Phường, xã ở {getProvince(Number(district))?.label}
                </p>
                <ul className="list-[disclosure-closed] list-inside">
                  <li
                    className="hover:underline cursor-pointer"
                    onClick={function () {
                      delete router.query.ward;
                      pushSearchQueries(router, {});
                    }}
                  >
                    Tất cả
                  </li>
                  {WARDS(Number(district)).map((item, index) => (
                    <li
                      className="hover:underline cursor-pointer"
                      key={index}
                      onClick={function () {
                        pushSearchQueries(router, { ward: item.value });
                      }}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              {/* district */}
              <div className="border border-gray-200 rounded-[3px] px-[20px] py-[10px] shadow-md mt-[20px]">
                <p className="font-bold text-[18px] mb-[10px] text-center">
                  Khu vực quận, huyện khác
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

const TopArticles = ({
  list,
  loading,
}: {
  list: Array<ARTICLE_MODEL>;
  loading: boolean;
}) => {
  return (
    <>
      <div className="px-[20px] py-[10px] bg-baseColor text-white font-bold rounded-[3px]">
        Tin TOP
      </div>
      {loading ? (
        <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
          <BoxSkeletonArticle count={3} />
        </div>
      ) : list.length > 0 ? (
        <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
          {list.map((item, index) => (
            <CardArticle data={item} key={index} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default Authentication(DistrictSearchPage, { requiredLogin: false });

import CardArticle from '@/components/common/CardArticle';
import InputField from '@/components/common/InputField';
import LineHorizontal from '@/components/common/LineHorizontal';
import PaginationState from '@/components/common/PaginationState';
import BoxSkeletonArticle from '@/components/common/Skeleton/CardArticleSkeleton';
import { useAuth } from '@/stores/Auth';
import { useRouter } from 'next/router';
import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import NoResults from '../../thue-tro/NoResults';

const LIMIT = 5;

const BoxManageSaveArticle = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [currentPage, setCurrentPage] = React.useState(1);
  const router = useRouter();
  const keyword = router.query.q as string;

  const { register, handleSubmit } = useForm();

  React.useEffect(() => {
    actionAuth.getListSaveArticleAsync({
      limit: LIMIT,
      keyword: keyword,
      page: currentPage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, currentPage]);

  const handleSearch = (
    data: any,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    const { keyword } = data;
    if (!keyword) router.push(`/thong-tin-ca-nhan/bai-dang-da-luu`);
    else router.push(`/thong-tin-ca-nhan/bai-dang-da-luu?q=${keyword}`);
  };

  return (
    <div className="container_shadow">
      <div className="mb-[20px] grid grid-cols-6 gap-2 items-center">
        <div className="col-span-4">
          <p className="text-black-100 text-[24px] font-bold">
            Bài viết đã lưu
          </p>
        </div>
        <form className="col-span-2" onSubmit={handleSubmit(handleSearch)}>
          <InputField
            type="text"
            register={register('keyword')}
            name="keyword"
            showLabel={false}
            placeholder="Tìm kiếm ..."
          />
        </form>
      </div>
      <LineHorizontal />
      <div className="mt-[20px]">
        Đã lưu{' '}
        <span className="text-baseColor font-bold">
          {stateAuth.saveArticles.total}
        </span>{' '}
        bài
        {stateAuth.saveArticles.loading ? (
          <BoxSkeletonArticle showVertical={false} count={3} />
        ) : stateAuth.saveArticles.list.length > 0 ? (
          stateAuth.saveArticles.list.map((item, index) => (
            <CardArticle data={item} key={index} showVertical={false} />
          ))
        ) : (
          <NoResults />
        )}
      </div>
      <div className="mt-[20px]">
        <PaginationState
          total={stateAuth.saveArticles.total}
          limit={LIMIT}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BoxManageSaveArticle;

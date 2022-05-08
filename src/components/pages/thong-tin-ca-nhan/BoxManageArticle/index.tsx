import CardArticle from '@/components/common/CardArticle';
import InputField from '@/components/common/InputField';
import LineHorizontal from '@/components/common/LineHorizontal';
import { useLessor } from '@/stores/Lessor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

const BoxManageArticle = () => {
  const [stateLessor, actionLessor] = useLessor();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const slug = router.query.slug as string;
  const keyword = router.query.q as string;
  const status = slug === 'da-duyet' ? true : false;

  React.useEffect(() => {
    actionLessor.getLessorArticleAsync({
      limit: 5,
      isApproved: status,
      keyword,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const handleSearch = (
    data: any,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    const { keyword } = data;
    if (!keyword) router.push(`/thong-tin-ca-nhan/quan-ly-bai-dang/${slug}`);
    else
      router.push(`/thong-tin-ca-nhan/quan-ly-bai-dang/${slug}?q=${keyword}`);
  };

  return (
    <div className="container_shadow">
      <p className="text-black-100 text-[24px] font-bold">Quản lý bài đăng</p>
      <div className="my-[20px] grid grid-cols-2 gap-2">
        <div className="flex gap-x-[20px] col-span-1">
          <Link href={`/thong-tin-ca-nhan/quan-ly-bai-dang/da-duyet`}>
            <a
              className={`text-black py-[10px] min-w-[100px] ${
                status && '!text-baseColor font-bold'
              }`}
            >
              Đã duyệt
            </a>
          </Link>
          <Link href={`/thong-tin-ca-nhan/quan-ly-bai-dang/chua-duyet`}>
            <a
              className={`text-black py-[10px] min-w-[100px] ${
                !status && '!text-baseColor font-bold'
              }`}
            >
              Chưa duyệt
            </a>
          </Link>
        </div>
        <form className="col-span-1" onSubmit={handleSubmit(handleSearch)}>
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
        {stateLessor.articles.list.map((item, index) => (
          <CardArticle data={item} key={index} showVertical={false} />
        ))}
      </div>
      <div className="mt-[20px]"></div>
    </div>
  );
};

export default BoxManageArticle;

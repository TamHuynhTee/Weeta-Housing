import { pushSearchQueries } from '@/helpers/base.helpers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

const SearchBar = (props: { className?: string; placeholder?: string }) => {
  const { className = '', placeholder = 'Tìm kiếm ...' } = props;
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  const urlKeyword = router.query.q as string;

  React.useEffect(() => {
    if (urlKeyword) {
      setValue('keyword', urlKeyword);
    } else setValue('keyword', '');
  }, [urlKeyword, setValue]);

  const handleSearch = (data: any) => {
    const keyword = data.keyword.trim();
    if (keyword === '') return;
    pushSearchQueries(router, { q: keyword });
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="h-full relative">
      <input
        {...register('keyword')}
        className={`w-full h-full bg-inherit border border-solid rounded-[3px] outline-none pl-[10px] focus:shadow-[0_0_0_1px_rgb(0_132_137_/_20%)] hover:border-[rgb(0_132_137)] pr-[30px] ${className}`}
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="flex items-center ml-[10px] absolute right-[10px] top-[50%] translate-y-[-50%]"
      >
        <Image
          src="/icons/ic_search.png"
          alt="icon"
          objectFit="cover"
          width={16}
          height={16}
        />
      </button>
    </form>
  );
};

export default React.memo(SearchBar);

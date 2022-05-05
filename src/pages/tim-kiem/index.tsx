import CardArticle from '@/components/common/CardArticle';
import InputField from '@/components/common/InputField';
import SelectBoxField from '@/components/common/SelectBoxField';
import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxSelectLocation from '@/components/pages/tao-tin-moi/BoxSelectLocation';
import { DISTRICTS } from '@/constants/location.constants';
import { formatMoney } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { ARTICLE_MODEL } from '@/models/Article.model';
import { useArticle } from '@/stores/Article';
import { useRouter } from 'next/router';
import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { batch } from 'react-sweet-state';

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
          <ArticleFilter />
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
      </div>
    </>
  );
};

const ArticleFilter = () => {
  const [district, setDistrict] = React.useState('Chọn quận, huyện');
  //   const [ward, setWard] = React.useState('Chọn phường, xã');
  //   const [selectedDistrict, setSelectedDistrict] = React.useState<
  //     number | undefined
  //   >(undefined);
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const keyword = router.query.q as string;

  const handleSearch = (
    data: any,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    console.log(data);
    // const { keyword } = data;
    // if (!keyword) router.push(`/thong-tin-ca-nhan/quan-ly-bai-dang/${slug}`);
    // else
    //   router.push(`/thong-tin-ca-nhan/quan-ly-bai-dang/${slug}?q=${keyword}`);
  };

  const handleSelectDistrict = (item: { label: string; value: string }) => {
    batch(() => {
      setDistrict(item.label);
      setValue('district', item.label);
      //   setValue('ward', '');
      //   setSelectedDistrict(+item.value);
      //   setWard('Chọn phường, xã');
    });
  };

  React.useEffect(() => {
    if (keyword) {
      setValue('keyword', keyword);
    }
  }, [keyword, setValue]);

  return (
    <form
      className="w-full py-[20px] grid grid-cols-4 gap-3"
      onSubmit={handleSubmit(handleSearch)}
    >
      <div className="col-span-1">
        <InputField
          type="text"
          register={register('keyword')}
          name="keyword"
          showLabel={false}
          placeholder="Tìm kiếm ..."
        />
      </div>
      <div className="col-span-1">
        <SelectBoxField
          label={'Chọn quận, huyện'}
          id="district"
          state={district}
          registerForm={register('district')}
          name="district"
          showLabel={false}
          overrideClassNameContainer
          classNameContainer=""
          isRequired
        >
          <BoxSelectLocation
            items={DISTRICTS}
            handleSelectItem={handleSelectDistrict}
            htmlFor="district"
          />
        </SelectBoxField>
      </div>
      <div className="col-span-1">
        <SelectBoxField
          label={'Theo giá'}
          id="price"
          state={district}
          registerForm={register('price')}
          name="price"
          showLabel={false}
          overrideClassNameContainer
          classNameContainer=""
          isRequired
        >
          <BoxSelectLocation
            items={DISTRICTS}
            handleSelectItem={handleSelectDistrict}
            htmlFor="price"
          />
        </SelectBoxField>
      </div>
      <div className="col-span-1"></div>
    </form>
  );
};

export default Authentication(SearchPage, { requiredLogin: false });

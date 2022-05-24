import {
  formatArticleTime,
  formatMoney,
  getLengthArray,
} from '@/helpers/base.helpers';
import { ARTICLE_MODEL } from '@/models/Article.model';
import { useAuth } from '@/stores/Auth';
import Link from 'next/link';
import React from 'react';
import SaveArticleComponent from '../SaveArticleComponent';

interface ErrorTextProps {
  data: ARTICLE_MODEL;
  showVertical?: boolean;
}

const CardArticle = (props: ErrorTextProps) => {
  const { data, showVertical = true } = props;
  const [stateAuth] = useAuth();
  //   console.log(`data`, data);
  return showVertical ? (
    <div className="w-full min-h-[370px] rounded-[5px] border relative">
      <div className="w-full h-[220px] rounded-tl-[5px] rounded-tr-[5px]">
        <img
          src={
            data.image && getLengthArray(data.image) > 0
              ? data.image[0]
              : '/images/img_no_image.jpg'
          }
          className="w-full h-full object-cover rounded-tl-[5px] rounded-tr-[5px]"
          alt=""
        />
      </div>
      <div className="px-[20px] py-[10px]">
        <Link href={`/bai-dang/${data._id}`}>
          <a className="text-[18px] text-black hover:text-baseColor font-semibold max_line-2 h-[54px]">
            {data.title}
          </a>
        </Link>
        <p className="text-[16px] font-normal max_line-1 mt-[10px]">
          {data.address}
        </p>
        <p className="text-[20px] font-bold max_line-2 text-baseColor mt-[10px]">
          {formatMoney(data.price)}đ
        </p>
        <p className="text-[16px] font-semibold max_line-1 text-gray-400 mt-[10px]">
          {formatArticleTime(data.createdAt)}
        </p>
      </div>
      <SaveArticleComponent
        className="top-[10px] right-[10px]"
        articleId={data._id}
        isSaved={stateAuth.auth?.saveArticle.includes(data._id)}
      />
    </div>
  ) : (
    <div className="w-full h-[220px] rounded-[3px] grid grid-cols-3 gap-4 py-[20px] border-b last:border-b-0">
      <div className="col-span-1 h-full">
        <div className="w-full h-full rounded-[5px] border">
          <img
            src={
              data.image && getLengthArray(data.image) > 0
                ? data.image[0]
                : '/images/img_no_image.jpg'
            }
            className="w-full h-[180px] object-cover rounded-[5px]"
            alt=""
          />
        </div>
      </div>
      <div className="col-span-2 h-full relative">
        <Link href={`/bai-dang/${data._id}`}>
          <a className="text-[18px] text-black hover:text-baseColor font-semibold max_line-2 ">
            {data.title}
          </a>
        </Link>
        <p className="text-[16px] font-normal max_line-1 mt-[10px]">
          {data.address}
        </p>
        <p className="text-[20px] font-bold max_line-2 text-baseColor mt-[10px]">
          {formatMoney(data.price)}đ
        </p>
        <p className="text-[16px] font-semibold max_line-1 text-gray-400 mt-[10px]">
          {formatArticleTime(data.createdAt)}
        </p>
        <SaveArticleComponent
          className="bottom-[10px] right-[10px]"
          articleId={data._id}
          isSaved={stateAuth.auth?.saveArticle.includes(data._id)}
        />
      </div>
    </div>
  );
};

export default CardArticle;

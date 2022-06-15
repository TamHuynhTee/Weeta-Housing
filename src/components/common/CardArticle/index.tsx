import { ENUM_TYPE_ARTICLE } from '@/constants/base.constants';
import {
  detectMediaString,
  formatArticleTime,
  formatMoney,
  getLengthArray,
} from '@/helpers/base.helpers';
import { ARTICLE_MODEL } from '@/models/Article.model';
import { useAuth } from '@/stores/Auth';
import Image from 'next/image';
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
      <div className="w-full h-[220px] rounded-tl-[5px] rounded-tr-[5px] relative">
        <img
          src={
            data.image && getLengthArray(data.image) > 0
              ? data.image[0]
              : '/images/img_no_image.jpg'
          }
          className="w-full h-full object-cover rounded-tl-[5px] rounded-tr-[5px]"
          alt=""
        />
        <MediaCount
          className="border-double border-2 px-[10px] py-[5px] bg-black rounded-lg border-green-200 absolute bottom-[10px] right-[10px] text-white"
          media={data.image}
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
      {stateAuth.auth?._id !== data?.lessor?._id && (
        <SaveArticleComponent
          className="absolute top-[10px] right-[10px]"
          articleId={data._id}
          isSaved={stateAuth.auth?.saveArticle.includes(data._id)}
        />
      )}
    </div>
  ) : (
    <div className="w-full h-[220px] rounded-[3px] grid grid-cols-3 gap-4 py-[20px] border-b last:border-b-0">
      <div className="col-span-1 h-full">
        <div className="w-full h-full rounded-[5px] border relative">
          <img
            src={
              data.image && getLengthArray(data.image) > 0
                ? data.image[0]
                : '/images/img_no_image.jpg'
            }
            className="w-full h-[180px] object-cover rounded-[5px]"
            alt=""
          />
          <MediaCount
            className="border-double border-2 px-[10px] py-[5px] bg-black rounded-lg border-green-200 absolute bottom-[10px] right-[10px] text-white"
            media={data.image}
          />
        </div>
      </div>
      <div className="col-span-2 h-full relative flex flex-col">
        {/* Title and badge */}
        <div className="flex items-center justify-between">
          <Link href={`/bai-dang/${data._id}`}>
            <a className="text-[18px] text-black hover:text-baseColor font-semibold max_line-2 ">
              {data.title}
            </a>
          </Link>
          {data.servicePackageName === ENUM_TYPE_ARTICLE.UP && (
            <span className="bg-yellow-100 text-yellow-800 flex gap-1 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
              <Image
                src="/icons/ic_up_article.png"
                width="20"
                height="20"
                alt=""
              />
              UP
            </span>
          )}
        </div>
        {/* Address */}
        <p className="text-[16px] font-normal max_line-1 mt-[10px]">
          {data.address}
        </p>
        {/* Price */}
        <p className="text-[20px] font-bold max_line-2 text-baseColor mt-[10px]">
          {formatMoney(data.price)}đ
        </p>
        {/* Date approved */}
        <p className="text-[16px] font-semibold max_line-1 text-gray-400 mt-auto mb-[5px]">
          {formatArticleTime(data.createdAt)}
        </p>
        {/* Save article */}
        {stateAuth.auth?._id !== data?.lessor?._id && (
          <SaveArticleComponent
            className="absolute bottom-[10px] right-[10px]"
            articleId={data._id}
            isSaved={stateAuth.auth?.saveArticle.includes(data._id)}
          />
        )}
      </div>
    </div>
  );
};

const MediaCount = ({
  media,
  className = '',
}: {
  media: string[];
  className?: string;
}) => {
  const imageLength = getLengthArray(
    media.filter((item) => detectMediaString(item) === 'image')
  );
  const videoLength = getLengthArray(
    media.filter((item) => detectMediaString(item) === 'video')
  );
  return (
    <div className={className}>
      <div className="flex gap-x-[5px] items-center">
        {imageLength}
        <span className="h-[20px] w-[20px] object-contain">
          <img src="/icons/ic_image.png" alt="image" />
        </span>
      </div>
      {videoLength > 0 && (
        <div className="flex gap-x-[5px] items-center">
          {videoLength}
          <span className="h-[20px] w-[20px] object-contain">
            <img src="/icons/ic_video.png" alt="video" />
          </span>
        </div>
      )}
    </div>
  );
};

export default CardArticle;

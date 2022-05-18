import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
  showVertical?: boolean;
};

export const CardArticleSkeleton = (props: Props) => {
  const { showVertical = true } = props;
  return showVertical ? (
    <div className="w-full min-h-[370px]">
      <Skeleton height={220} className="" />
      <div className="pr-[20px] py-[10px]">
        <Skeleton height={24} />
        <Skeleton height={24} className="mt-[20px]" />
        <Skeleton height={24} width={100} className="mt-[10px]" />
      </div>
    </div>
  ) : (
    <div className="w-full h-[220px] grid grid-cols-3 gap-4 py-[20px]">
      <Skeleton className="col-span-1 h-full" />
      <div className="col-span-2 h-full relative">
        <Skeleton height={24} />
        <Skeleton height={24} width={300} className="mt-[30px]" />
        <Skeleton height={24} width={100} className="mt-[20px]" />
      </div>
    </div>
  );
};

type BoxProps = Props & {
  showVertical?: boolean;
  count?: number;
};

const BoxSkeletonArticle = (props: BoxProps) => {
  const { showVertical, count = 1 } = props;
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <CardArticleSkeleton key={index} showVertical={showVertical} />
      ))}
    </>
  );
};

export default BoxSkeletonArticle;

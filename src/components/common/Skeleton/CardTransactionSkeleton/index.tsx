import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const CardTransactionSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-5 gap-5 py-[20px]">
      <div className="col-span-3">
        <Skeleton height={50} className="w-full" />
        <Skeleton width={200} className="mt-[10px]" />
        <Skeleton width={200} className="mt-[10px]" />
      </div>
      <div className="col-span-2 relative">
        <Skeleton height={50} width={150} className="float-right clear-both" />
        <Skeleton width={100} className="mt-[10px] float-right clear-both" />
        <Skeleton width={100} className="mt-[10px] float-right clear-both" />
      </div>
    </div>
  );
};

type BoxProps = {
  count?: number;
};

const BoxSkeletonTransaction = (props: BoxProps) => {
  const { count = 1 } = props;
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <CardTransactionSkeleton key={index} />
      ))}
    </>
  );
};

export default BoxSkeletonTransaction;

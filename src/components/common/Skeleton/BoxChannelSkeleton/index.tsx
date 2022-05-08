import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.css';

const CardConversationSkeleton = () => {
  return (
    <div
      className={`pt-[21px] py-[21px] px-[20px] w-full flex gap-3 rounded-[2px]`}
    >
      <div className={`w-[80%] ${styles.rowAvatar}`}>
        <div className="w-full h-[50px] rounded-[50%] overflow-hidden">
          <Skeleton circle className="w-full h-full object-cover" />
        </div>

        <div className="w-full">
          <Skeleton className="h-[22px] w-[100px]" />
          <Skeleton className="mt-[9px] h-[22px]" />
        </div>
      </div>
      <div className="w-[20%]">
        <Skeleton className="mt-[20px] h-[22px] flex flex-row-reverse w-[100%]" />
      </div>
    </div>
  );
};

const BoxConversationSkeleton = ({ total = 5 }: { total: number }) => {
  return (
    <div>
      {new Array(total).fill(0).map((_, i) => (
        <CardConversationSkeleton key={i} />
      ))}
    </div>
  );
};
export default BoxConversationSkeleton;

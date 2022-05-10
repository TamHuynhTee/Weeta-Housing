import Skeleton from 'react-loading-skeleton';

const CardMyMessageSkeleton = () => {
  return (
    <div className={`flex flex-row-reverse w-full mt-[15px]`}>
      <div className="w-[40%]">
        <Skeleton className="pt-[20px] relative pb-[16px] pl-[21px] pr-[29px] w-full" />
      </div>
    </div>
  );
};

export default CardMyMessageSkeleton;

import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.css';

const CardGuessMessageSkeleton = () => {
  return (
    <div
      className={`mt-[15px] grid-cols-[45px_1fr] ${styles.rowAvatarSkeleton}`}
    >
      <div className={`w-full h-[45px] rounded-[50%]`}>
        <Skeleton className="w-full h-full object-cover" circle />
      </div>
      <Skeleton className="w-full pt-[20px] pb-[16px] pl-[21px] pr-[29px]" />
    </div>
  );
};

export default CardGuessMessageSkeleton;

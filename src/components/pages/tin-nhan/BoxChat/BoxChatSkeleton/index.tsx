import CardGuessMessageSkeleton from '@/components/common/Skeleton/CardGuessMessageSkeleton';
import CardMyMessageSkeleton from '@/components/common/Skeleton/CardMyMessageSkeleton';
import styles from '../styles.module.css';
const BoxChatSkeleton = () => {
  return (
    <div className={styles.scrollbar}>
      <CardMyMessageSkeleton />
      <CardGuessMessageSkeleton />
      <CardGuessMessageSkeleton />
      <CardMyMessageSkeleton />
      <CardMyMessageSkeleton />
      <CardGuessMessageSkeleton />
      <CardMyMessageSkeleton />
    </div>
  );
};
export default BoxChatSkeleton;

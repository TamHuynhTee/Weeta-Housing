import CardArticle from '@/components/common/CardArticle';
import BoxSkeletonArticle from '@/components/common/Skeleton/CardArticleSkeleton';
import { ARTICLE_MODEL } from '@/models/Article.model';
import NoResults from '../NoResults';

const TopArticlesSection = ({
  list,
  loading,
}: {
  list: Array<ARTICLE_MODEL>;
  loading: boolean;
}) => {
  return (
    <div className="mb-[10px]">
      <div className="px-[20px] py-[10px] bg-baseColor text-white font-bold rounded-[3px]">
        Tin TOP
      </div>
      {loading ? (
        <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
          <BoxSkeletonArticle count={3} />
        </div>
      ) : list.length > 0 ? (
        <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
          {list.map((item, index) => (
            <CardArticle data={item} key={index} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default TopArticlesSection;

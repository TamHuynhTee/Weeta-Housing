import { useAuth } from '@/stores/Auth';
import React from 'react';

type ISaveArticle = {
  className?: string;
  articleId: string;
  isSaved: boolean | undefined;
};

const SaveArticleComponent = (props: ISaveArticle) => {
  const { className = '', articleId, isSaved = false } = props;
  const [saved, setSaved] = React.useState(false);
  const [, actionAuth] = useAuth();

  React.useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = React.useCallback(
    async function () {
      const result = await actionAuth.saveArticleAsync(articleId);
      if (result) setSaved(!saved);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saved, articleId]
  );

  return (
    <div
      className={`${className} flex justify-center items-center p-2 rounded-[5px] bg-red-200`}
      onClick={handleSave}
    >
      <div className="w-[25px] h-[25px] rounded-[50%] hover:scale-105 cursor-pointer">
        <img
          src={`/icons/ic_heart_${!saved ? 'outlined' : 'fill'}.png`}
          alt="save"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default SaveArticleComponent;

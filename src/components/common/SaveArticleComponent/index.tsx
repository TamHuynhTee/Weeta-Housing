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
      className={`absolute ${className} hover:scale-105 cursor-pointer`}
      onClick={handleSave}
    >
      <div className="w-[30px] h-[30px] rounded-[50%]">
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

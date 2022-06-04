import { formatMoney } from '@/helpers/base.helpers';
import { ARTICLE_PACKAGE_CARD_MODEL } from '@/models/ArticlePackage.model';
import React from 'react';

type IPropsArticlePackageCard = {
  registerName: string;
  id: string;
  articlePackage: ARTICLE_PACKAGE_CARD_MODEL;
  setArticlePackage: React.Dispatch<
    React.SetStateAction<ARTICLE_PACKAGE_CARD_MODEL>
  >;
  itemPackage: ARTICLE_PACKAGE_CARD_MODEL;
};

const ArticlePackageCard = (props: IPropsArticlePackageCard) => {
  const { registerName, articlePackage, setArticlePackage, id, itemPackage } =
    props;
  return (
    <label
      htmlFor={id}
      className={`col-span-1 rounded-[5px] border border-gray-300 hover:shadow-md px-[40px] py-[10px] cursor-pointer transition-all duration-300 ${
        articlePackage.serviceName === itemPackage.serviceName &&
        'border-orange-200 border-1'
      }`}
    >
      <input
        type="radio"
        name={registerName}
        id={id}
        value={itemPackage.serviceName}
        hidden
        onChange={() => setArticlePackage(itemPackage)}
      />
      <p
        className={`text-[24px] text-center font-bold ${itemPackage.titleColor}`}
      >
        {itemPackage.title}
      </p>
      <div className="mt-[10px]">
        <p className="">
          <span className="font-bold">Phí đăng tin</span>:{' '}
          {itemPackage.price === 0
            ? 'Miễn phí'
            : `${formatMoney(itemPackage.price)} VND`}
        </p>
        <p className="mt-[5px] text-justify">
          <span className="font-bold">Mô tả</span>: {itemPackage.description}
        </p>
      </div>
    </label>
  );
};

export default ArticlePackageCard;

import LineHorizontal from '@/components/common/LineHorizontal';
import SelectBoxField from '@/components/common/SelectBoxField';
import { ENUM_TYPE_ARTICLE } from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import { notifyError } from '@/helpers/toast.helpers';
import { ARTICLE_PACKAGE_CARD_MODEL } from '@/models/ArticlePackage.model';
import { paymentArticleService } from '@/services/apis/Article';
import { useRouter } from 'next/router';
import React from 'react';
import ArticlePackageCard from '../ArticlePackageCard';

const ARTICLE_PACKAGES: Array<ARTICLE_PACKAGE_CARD_MODEL> = [
  {
    serviceName: ENUM_TYPE_ARTICLE.COMMON,
    titleColor: 'rgb(4_153_168)',
    title: 'COMMON',
    price: 0,
    description:
      'Gói thường, tin đăng sẽ được hiển thị sắp xếp theo thời gian đăng, làm mới 1 lần/ngày',
  },
  {
    serviceName: ENUM_TYPE_ARTICLE.UP,
    titleColor: 'rgb(17_182_102)',
    title: 'UP',
    price: 20000,
    description:
      'Gói nâng cấp, tin đăng được hiển thị đầu danh sách mục tìm kiếm theo thứ tự thời gian đăng , làm mới 1 lần/ngày',
  },
  {
    serviceName: ENUM_TYPE_ARTICLE.TOP,
    titleColor: 'rgb(235_130_25)',
    title: 'TOP',
    price: 30000,
    description:
      'Gói cao cấp, tin đăng sẽ nằm ở mục ưu tiên trên đầu danh sách hiển thị, làm mới 1 lần/ngày',
  },
];

const FormPickPackage = () => {
  const router = useRouter();
  const [articlePackage, setArticlePackage] =
    React.useState<ARTICLE_PACKAGE_CARD_MODEL>(
      ARTICLE_PACKAGES[0] as ARTICLE_PACKAGE_CARD_MODEL
    );
  const [pickedDays, setPickedDays] = React.useState(1);

  const articleId = router.query.article as string;

  React.useEffect(() => {
    setPickedDays(1);
  }, [articlePackage]);

  const handleProceedArticle = async () => {
    if (articleId) {
      const result = await paymentArticleService({
        servicePackageName: articlePackage.serviceName,
        prices: articlePackage.price * pickedDays,
        numOfDate: pickedDays,
        articleId,
      });
      if (result) {
        window.location.href = result.data;
      } else notifyError('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-[20px]">
        {ARTICLE_PACKAGES.map((item, index) => (
          <ArticlePackageCard
            registerName="package"
            key={index}
            id={`article_package_${item.serviceName}`}
            itemPackage={item}
            articlePackage={articlePackage}
            setArticlePackage={setArticlePackage}
          />
        ))}
      </div>
      <div className="my-[20px]">
        <LineHorizontal />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {articlePackage.serviceName !== ENUM_TYPE_ARTICLE.COMMON && (
          <div className="col-span-1 border-r pr-[10px] flex items-center gap-3">
            <span className="text-[20px] font-bold">Số ngày mua gói:</span>
            <SelectBoxField
              id="days"
              state={pickedDays.toString()}
              name="days"
              showLabel={false}
              classNameContainer="flex-1"
              overrideClassNameContainer
            >
              <div className="max-h-[200px] overflow-y-scroll selectBox">
                {[...Array(30)].map((_, index) => (
                  <label
                    key={index}
                    htmlFor={'days'}
                    className="input_checkbox font-normal py-[5px]"
                    onClick={() => {
                      setPickedDays(index + 1);
                    }}
                  >
                    <div className="flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px]">
                      <p className="self-center text-16px text-black">
                        {index + 1}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </SelectBoxField>
          </div>
        )}
        <div
          className={`col-span-${
            articlePackage.serviceName === ENUM_TYPE_ARTICLE.COMMON ? '2' : '1'
          } p-[20px]`}
        >
          <p className="text-[20px] font-bold">
            Tổng phí:{' '}
            <span className={`text-[${articlePackage.titleColor}]`}>
              {formatMoney(articlePackage.price * pickedDays)} VND
            </span>
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <button
            type="button"
            className="button-primary w-full h-[40px] md:h-[30px]"
            onClick={handleProceedArticle}
          >
            {articlePackage.serviceName === ENUM_TYPE_ARTICLE.COMMON
              ? 'Đăng'
              : 'Thanh toán'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPickPackage;

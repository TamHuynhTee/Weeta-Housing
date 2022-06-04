import LineHorizontal from '@/components/common/LineHorizontal';
import SelectBoxField from '@/components/common/SelectBoxField';
import {
  ARTICLE_PACKAGES,
  ENUM_PAYMENT_TYPE,
  ENUM_PAYMENT_UNIT,
  ENUM_TYPE_ARTICLE,
} from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import { ARTICLE_PACKAGE_CARD_MODEL } from '@/models/ArticlePackage.model';
import { IPayment } from '@/services/apis/Payment/Payment.interface';
import { usePayment } from '@/stores/Payment';
import { useRouter } from 'next/router';
import React from 'react';
import ArticlePackageCard from '../ArticlePackageCard';

const FormPickPackage = () => {
  const router = useRouter();
  const [, actionPayment] = usePayment();
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
      const payload: IPayment = {
        type: ENUM_PAYMENT_TYPE.SERVICE_PACKAGE,
        packageArticle: {
          servicePackageName: articlePackage.serviceName,
          numOfDate: pickedDays,
          articleId,
        },
        prices: articlePackage.price * pickedDays,
        price: articlePackage.price,
        quantity: pickedDays,
        unit: ENUM_PAYMENT_UNIT.DAY,
      };
      actionPayment.setPayment(ENUM_PAYMENT_TYPE.SERVICE_PACKAGE, payload);
      router.push('/thanh-toan');
      //   const payload: IReqPaymentArticle = {
      //     type: ENUM_PAYMENT_TYPE.SERVICE_PACKAGE,
      //     servicePackageName: articlePackage.serviceName,
      //     prices: articlePackage.price * pickedDays,
      //     numOfDate: pickedDays,
      //     articleId,
      //   };
      //   const result = await paymentService(payload);
      //   if (result) {
      //     window.location.href = result.data;
      //   } else notifyError('Có lỗi xảy ra, vui lòng thử lại');
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

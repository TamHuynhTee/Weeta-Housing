import SelectBoxField from '@/components/common/SelectBoxField';
import { formatMoney } from '@/helpers/base.helpers';
import Hook from '@/hooks/Articles/articles.hook';
import { useRouter } from 'next/router';
import React from 'react';
import BoxSearchPrice from '../BoxSearchPrice';

const PriceFilter = () => {
  const {
    statePriceFilter,
    setStatePriceFilter,
    handleSelectMinPrice,
    handleSelectMaxPrice,
    minPrice,
    maxPrice,
    setMaxPrice,
    setMinPrice,
  } = Hook.useFilterPriceArticle();
  const router = useRouter();

  const priceGTE = router.query.priceGTE as string;
  const priceLTE = router.query.priceLTE as string;

  React.useEffect(() => {
    if (priceGTE || priceLTE) {
      if (priceGTE && priceLTE) {
        setStatePriceFilter(
          `${formatMoney(+priceGTE)} - ${formatMoney(+priceLTE)}`
        );
        setMinPrice(+priceGTE);
        setMaxPrice(+priceLTE);
      } else if (priceGTE) {
        setStatePriceFilter(`>= ${formatMoney(+priceGTE)}`);
        setMinPrice(+priceGTE);
        setMaxPrice(-1);
      } else if (priceLTE) {
        setStatePriceFilter(`<= ${formatMoney(+priceLTE)}`);
        setMinPrice(-1);
        setMaxPrice(+priceLTE);
      }
    } else {
      setMinPrice(-1);
      setMaxPrice(-1);
      setStatePriceFilter(`Giá thuê`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceGTE, priceLTE]);

  return (
    <SelectBoxField
      id="price"
      state={statePriceFilter}
      name="price"
      showLabel={false}
      overrideClassNameContainer
      classNameContainer=""
      iconPlaceholder="/icons/ic_money_filter.png"
      isRequired
    >
      <BoxSearchPrice
        handleSelectMinPrice={handleSelectMinPrice}
        handleSelectMaxPrice={handleSelectMaxPrice}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
    </SelectBoxField>
  );
};

export default React.memo(PriceFilter);

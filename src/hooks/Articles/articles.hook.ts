import { formatMoney, pushSearchQueries } from '@/helpers/base.helpers';
import { useRouter } from 'next/router';
import React from 'react';
import { batch } from 'react-sweet-state';

const useFilterDistrictArticle = () => {
  const initialText = 'TP Hồ Chí Minh';
  const [district, setDistrict] = React.useState(initialText);
  const [selectedDistrict, setSelectedDistrict] = React.useState({
    label: initialText,
    value: -1,
  });
  const router = useRouter();

  const handleSelectDistrict = (item: { label: string; value: number }) => {
    batch(() => {
      setDistrict(item.label);
      setSelectedDistrict(item);
      if (item.value !== -1) router.push(`/thue-tro/${item.value}`);
      else router.push(`/thue-tro`);
    });
  };

  return {
    district,
    setDistrict,
    handleSelectDistrict,
    setSelectedDistrict,
    selectedDistrict,
  };
};

const useFilterPriceArticle = () => {
  const initialText = 'Giá thuê';
  const [statePriceFilter, setStatePriceFilter] =
    React.useState<string>(initialText);
  const [minPrice, setMinPrice] = React.useState<number>(-1);
  const [maxPrice, setMaxPrice] = React.useState<number>(-1);

  const router = useRouter();

  const district = router.query.district as string;

  const handleSelectMinPrice = (price: number) => {
    if (price === -1 && maxPrice === -1) setStatePriceFilter(initialText);
    else if (price !== -1 && maxPrice === -1)
      setStatePriceFilter(`> ${formatMoney(price)}`);
    else if (price === -1 && maxPrice !== -1)
      setStatePriceFilter(`< ${formatMoney(maxPrice)}`);
    else if (price !== -1 && maxPrice !== -1) {
      if (maxPrice <= price) {
        setMaxPrice(-1);
        setStatePriceFilter(`> ${formatMoney(price)}`);
        pushSearchQueries(
          router,
          { priceGTE: price, priceLTE: undefined },
          district
        );
      } else
        setStatePriceFilter(`${formatMoney(price)} - ${formatMoney(maxPrice)}`);
    }
    setMinPrice(price);
    if (price !== -1) pushSearchQueries(router, { priceGTE: price }, district);
    else {
      pushSearchQueries(router, { priceGTE: undefined }, district);
    }
  };

  const handleSelectMaxPrice = (price: number) => {
    if (price === -1 && minPrice === -1) setStatePriceFilter(initialText);
    else if (price !== -1 && minPrice === -1)
      setStatePriceFilter(`< ${formatMoney(price)}`);
    else if (price === -1 && minPrice !== -1)
      setStatePriceFilter(`> ${formatMoney(minPrice)}`);
    else if (price !== -1 && minPrice !== -1) {
      if (minPrice >= price) {
        setMinPrice(-1);
        setStatePriceFilter(`< ${formatMoney(price)}`);
        pushSearchQueries(
          router,
          { priceLTE: price, priceGTE: undefined },
          district
        );
      } else
        setStatePriceFilter(`${formatMoney(minPrice)} - ${formatMoney(price)}`);
    }
    setMaxPrice(price);
    if (price !== -1) pushSearchQueries(router, { priceLTE: price }, district);
    else {
      pushSearchQueries(router, { priceLTE: undefined }, district);
    }
  };

  return {
    statePriceFilter,
    setStatePriceFilter,
    handleSelectMinPrice,
    handleSelectMaxPrice,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  };
};

const useFilterAreaArticle = () => {
  const initialText = 'Diện tích';
  const [stateAreaFilter, setStateAreaFilter] =
    React.useState<string>(initialText);
  const [minArea, setMinArea] = React.useState<number>(-1);
  const [maxArea, setMaxArea] = React.useState<number>(-1);

  const router = useRouter();
  const district = router.query.district as string;

  const handleSelectMinArea = (area: number) => {
    if (area === -1 && maxArea === -1) setStateAreaFilter(initialText);
    else if (area !== -1 && maxArea === -1) setStateAreaFilter(`> ${area}`);
    else if (area === -1 && maxArea !== -1) setStateAreaFilter(`< ${maxArea}`);
    else if (area !== -1 && maxArea !== -1) {
      if (maxArea <= area) {
        setMaxArea(-1);
        setStateAreaFilter(`> ${area}`);
        pushSearchQueries(
          router,
          { areaGTE: area, areaLTE: undefined },
          district
        );
      } else setStateAreaFilter(`${area} - ${maxArea}`);
    }
    setMinArea(area);
    if (area !== -1) pushSearchQueries(router, { areaGTE: area }, district);
    else {
      pushSearchQueries(router, { areaGTE: undefined }, district);
    }
  };

  const handleSelectMaxArea = (area: number) => {
    if (area === -1 && minArea === -1) setStateAreaFilter(initialText);
    else if (area !== -1 && minArea === -1)
      setStateAreaFilter(`< ${formatMoney(area)}`);
    else if (area === -1 && minArea !== -1)
      setStateAreaFilter(`> ${formatMoney(minArea)}`);
    else if (area !== -1 && minArea !== -1) {
      if (minArea >= area) {
        setMinArea(-1);
        setStateAreaFilter(`< ${formatMoney(area)}`);
        pushSearchQueries(
          router,
          { areaLTE: area, areaGTE: undefined },
          district
        );
      } else
        setStateAreaFilter(`${formatMoney(minArea)} - ${formatMoney(area)}`);
    }
    setMaxArea(area);
    if (area !== -1) pushSearchQueries(router, { areaLTE: area }, district);
    else {
      pushSearchQueries(router, { areaLTE: undefined }, district);
    }
  };

  return {
    stateAreaFilter,
    setStateAreaFilter,
    handleSelectMinArea,
    handleSelectMaxArea,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,
  };
};

const Hook = {
  useFilterPriceArticle,
  useFilterDistrictArticle,
  useFilterAreaArticle,
};

export default Hook;

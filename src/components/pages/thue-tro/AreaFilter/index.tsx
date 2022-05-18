import SelectBoxField from '@/components/common/SelectBoxField';
import Hook from '@/hooks/Articles/articles.hook';
import { useRouter } from 'next/router';
import React from 'react';
import BoxSearchArea from '../BoxSearchArea';

const AreaFilter = () => {
  const {
    stateAreaFilter,
    setStateAreaFilter,
    handleSelectMaxArea,
    handleSelectMinArea,
    minArea,
    maxArea,
    setMaxArea,
    setMinArea,
  } = Hook.useFilterAreaArticle();
  const router = useRouter();

  const areaGTE = router.query.areaGTE as string;
  const areaLTE = router.query.areaLTE as string;

  React.useEffect(() => {
    if (areaGTE || areaLTE) {
      if (areaGTE && areaLTE) {
        setStateAreaFilter(`${areaGTE} - ${areaLTE}`);
        setMinArea(+areaGTE);
        setMaxArea(+areaLTE);
      } else if (areaGTE) {
        setStateAreaFilter(`>= ${areaGTE}`);
        setMinArea(+areaGTE);
        setMaxArea(-1);
      } else if (areaLTE) {
        setStateAreaFilter(`<= ${areaLTE}`);
        setMinArea(-1);
        setMaxArea(+areaLTE);
      }
    } else {
      setMinArea(-1);
      setMaxArea(-1);
      setStateAreaFilter(`Diện tích`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaGTE, areaLTE]);

  return (
    <SelectBoxField
      id="area"
      state={stateAreaFilter}
      name="area"
      showLabel={false}
      overrideClassNameContainer
      classNameContainer=""
      iconPlaceholder="/icons/ic_area_square.png"
      isRequired
    >
      <BoxSearchArea
        handleSelectMinArea={handleSelectMinArea}
        handleSelectMaxArea={handleSelectMaxArea}
        maxArea={maxArea}
        minArea={minArea}
      />
    </SelectBoxField>
  );
};

export default React.memo(AreaFilter);

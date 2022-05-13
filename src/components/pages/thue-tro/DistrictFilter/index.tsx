import SelectBoxField from '@/components/common/SelectBoxField';
import { DISTRICTS } from '@/constants/location.constants';
import { getProvince } from '@/helpers/base.helpers';
import Hook from '@/hooks/Articles/articles.hook';
import { useRouter } from 'next/router';
import React from 'react';
import BoxSearchLocation from '../BoxSearchLocation';

const DistrictFilter = () => {
  const {
    district,
    handleSelectDistrict,
    selectedDistrict,
    setDistrict,
    setSelectedDistrict,
  } = Hook.useFilterDistrictArticle();
  const router = useRouter();

  const urlDistrict = router.query.district as string;

  React.useEffect(() => {
    if (urlDistrict) {
      setDistrict(getProvince(+urlDistrict)?.label || '');
      setSelectedDistrict(getProvince(+urlDistrict));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlDistrict]);

  return (
    <SelectBoxField
      id="district"
      state={district}
      name="district"
      showLabel={false}
      overrideClassNameContainer
      classNameContainer=""
      iconPlaceholder="/icons/ic_location.png"
      isRequired
    >
      <BoxSearchLocation
        items={DISTRICTS}
        handleSelectDistrict={handleSelectDistrict}
        htmlFor="district"
        selectedItem={selectedDistrict}
      />
    </SelectBoxField>
  );
};

export default React.memo(DistrictFilter);

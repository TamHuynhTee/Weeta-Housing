import LayoutCommon from '@/components/layout/LayoutCommon';
import { useRouter } from 'next/router';
import React from 'react';

const SearchPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <React.Fragment>
      <LayoutCommon title="Tìm trọ" isVisibleSearchBar>
        <div className="w-full">{JSON.stringify(router.query)}</div>
      </LayoutCommon>
    </React.Fragment>
  );
};

// Home.layout = LayoutCommon;

export default SearchPage;

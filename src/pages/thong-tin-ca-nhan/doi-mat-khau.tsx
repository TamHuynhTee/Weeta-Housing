import LayoutCommon from '@/components/layout/LayoutCommon';
import ContainerProfile from '@/components/pages/thong-tin-ca-nhan/Container';
import BoxChangePass from '@/components/pages/thong-tin-ca-nhan/doi-mat-khau/BoxChangePass';
import React from 'react';

const ChangePassword = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Đổi mật khẩu" isVisibleSearchBar>
        <ContainerProfile>
          <BoxChangePass />
        </ContainerProfile>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default ChangePassword;

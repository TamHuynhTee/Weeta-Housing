import LayoutCommon from '@/components/layout/LayoutCommon';
import ContainerProfile from '@/components/pages/thong-tin-ca-nhan/Container';
import BoxLessorAccount from '@/components/pages/thong-tin-ca-nhan/tai-khoan-moi-gioi/BoxLessAccount/BoxLessorAccount';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

const LessorAccount = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Tài khoản môi giới" isVisibleSearchBar>
        <ContainerProfile>
          <BoxLessorAccount />
        </ContainerProfile>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(LessorAccount, { requiredLogin: true });

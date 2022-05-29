import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxManageSaveArticle from '@/components/pages/thong-tin-ca-nhan/BoxManageSaveArticle';
import ContainerProfile from '@/components/pages/thong-tin-ca-nhan/Container';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

const SaveArticleManagement = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Bài đăng đã lưu" isVisibleSearchBar>
        <ContainerProfile>
          <BoxManageSaveArticle />
        </ContainerProfile>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(SaveArticleManagement, { requiredLogin: true });

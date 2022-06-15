import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxManageArticle from '@/components/pages/thong-tin-ca-nhan/BoxManageArticle';
import ContainerProfile from '@/components/pages/thong-tin-ca-nhan/Container';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

const ArticleManagement = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Quản lý bài viết" isVisibleSearchBar>
        <ContainerProfile>
          <BoxManageArticle />
        </ContainerProfile>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(ArticleManagement, { requiredLogin: true });

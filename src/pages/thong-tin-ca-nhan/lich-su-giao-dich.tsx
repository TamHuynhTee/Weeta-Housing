import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxTransactionHistory from '@/components/pages/thong-tin-ca-nhan/BoxTransactionHistory';
import ContainerProfile from '@/components/pages/thong-tin-ca-nhan/Container';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

const TransactionHistory = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Giao dịch" isVisibleSearchBar>
        <ContainerProfile>
          <BoxTransactionHistory />
        </ContainerProfile>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(TransactionHistory, { requiredLogin: true });

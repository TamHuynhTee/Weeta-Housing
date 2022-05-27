import { useAuth } from '@/stores/Auth';
import React from 'react';

const BoxTransactionHistory = () => {
  const [stateAuth, actionAuth] = useAuth();

  return (
    <div className="container_shadow">
      <div className="w-full">
        <p className="text-black-100 text-[24px] font-bold">
          Lịch sử giao dịch
        </p>
      </div>
    </div>
  );
};

export default BoxTransactionHistory;

import LineHorizontal from '@/components/common/LineHorizontal';
import BoxSkeletonTransaction from '@/components/common/Skeleton/CardTransactionSkeleton';
import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { useLessor } from '@/stores/Lessor';
import React from 'react';
import NoResults from '../../thue-tro/NoResults';
import CardTransaction from './CardTransaction';

const TAB_MENU = [
  { type: ENUM_PAYMENT_TYPE.SERVICE_PACKAGE, title: 'Gói dịch vụ' },
  { type: ENUM_PAYMENT_TYPE.MEMBER_PACKAGE, title: 'Gói thành viên' },
];
const LIMIT = 10;

const BoxTransactionHistory = () => {
  //   const [stateAuth, actionAuth] = useAuth();
  const [stateLessor, actionLessor] = useLessor();
  const [typeTransaction, setTypeTransaction] =
    React.useState<ENUM_PAYMENT_TYPE>(ENUM_PAYMENT_TYPE.SERVICE_PACKAGE);

  React.useEffect(() => {
    (async function () {
      await actionLessor.getLessorTransactionAsync({
        type: typeTransaction,
        limit: LIMIT,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeTransaction]);

  const handleChangeType = (type: ENUM_PAYMENT_TYPE) => {
    if (type !== typeTransaction) setTypeTransaction(type);
  };

  const handleLoadMoreTransaction = async () => {
    await actionLessor.loadMoreLessorTransactionAsync({
      type: typeTransaction,
      limit: LIMIT,
      page: stateLessor.transactions.page + 1,
    });
  };

  return (
    <div className="container_shadow">
      <div className="w-full">
        <div className="grid grid-cols-2 items-center">
          <div className="col-span-1">
            <p className="text-black-100 text-[24px] font-bold">
              Lịch sử giao dịch
            </p>
          </div>
          <div className="col-span-1 grid grid-cols-2">
            {TAB_MENU.map((item, index) => (
              <button
                key={index}
                onClick={() => handleChangeType(item.type)}
                className={`text-black text-center rounded-lg py-[10px] min-w-[100px] ${
                  typeTransaction === item.type &&
                  '!text-white bg-baseColor font-bold'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <LineHorizontal className="my-[20px]" />
        <div className="flex flex-col gap-5">
          {stateLessor.transactions.loading ? (
            <BoxSkeletonTransaction count={3} />
          ) : stateLessor.transactions.list.length > 0 ? (
            <>
              {stateLessor.transactions.list.map((item, index) => (
                <CardTransaction
                  key={index}
                  data={item}
                  type={typeTransaction}
                />
              ))}
              {!stateLessor.transactions.isOver && (
                <button
                  className="button-outline-primary self-center w-[200px]"
                  onClick={handleLoadMoreTransaction}
                >
                  Tải thêm
                </button>
              )}
            </>
          ) : (
            <NoResults type="payment" text="Không có giao dịch" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BoxTransactionHistory;

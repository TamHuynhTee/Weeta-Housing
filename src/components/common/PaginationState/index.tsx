import React from 'react';

type Props = {
  total: number;
  limit: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationState = ({
  total,
  limit,
  currentPage,
  setCurrentPage,
}: Props) => {
  const totalPages = Math.ceil(total / limit);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-[20px] flex justify-center">
      <div className="flex">
        {totalPages > 1 && currentPage !== 1 && (
          <button
            className={`w-[50px] h-[50px] flex items-center justify-center border border-gray-200 hover:bg-green-100 border-r-0 rounded-tl-[5px] rounded-bl-[5px]`}
            onClick={function () {
              handleChangePage(currentPage - 1);
            }}
          >
            {'<'}
          </button>
        )}
        {[...Array(totalPages)].map((_, index) => (
          <button
            className={`w-[50px] h-[50px] flex items-center justify-center border border-gray-200 hover:bg-green-100 ${
              currentPage === index + 1 &&
              '!bg-baseColor !border-baseColor text-white cursor-default'
            } ${index !== 0 && index !== totalPages - 1 && 'border-x-0'}
            `}
            key={index}
            onClick={function () {
              handleChangePage(index + 1);
            }}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        {totalPages > 1 && currentPage !== totalPages && (
          <button
            className={`w-[50px] h-[50px] flex items-center justify-center border border-gray-200 hover:bg-green-100 border-l-0 rounded-tr-[5px] rounded-br-[5px]`}
            onClick={function () {
              handleChangePage(currentPage + 1);
            }}
          >
            {'>'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginationState;

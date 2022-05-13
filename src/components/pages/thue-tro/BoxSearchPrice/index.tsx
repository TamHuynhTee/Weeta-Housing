import { formatMoney } from '@/helpers/base.helpers';
import React from 'react';

type Props = {
  selectedItem?: { label: string; value: any };
  handleSelectMinPrice: (item: number) => void;
  handleSelectMaxPrice: (item: number) => void;
  maxPrice: number;
  minPrice: number;
};

const priceSort = [
  -1, 500000, 1000000, 3000000, 5000000, 7000000, 10000000, 20000000,
];

const BoxSearchPrice = (props: Props) => {
  const { handleSelectMinPrice, handleSelectMaxPrice, maxPrice, minPrice } =
    props;

  return (
    <div className="selectBox">
      <div className="grid grid-cols-2">
        <div className="col-span-1 border-r">
          <div className="flex item-center gap-x-[20px] bg-green-400 cursor-pointer px-[20px] py-[5px]">
            <p className="self-center text-[14px] text-white">Thấp nhất</p>
          </div>
          {priceSort.map((item, index) => {
            return (
              <label
                key={index}
                className="input_checkbox font-normal py-[5px]"
                onClick={() => {
                  handleSelectMinPrice(item);
                }}
              >
                <div
                  className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
                    minPrice === item && 'bg-green-100'
                  }`}
                >
                  <p className="self-center text-[16px] text-black">
                    {item === -1 ? 'Tất cả' : formatMoney(item)}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
        <div className="col-span-1">
          <div className="flex item-center gap-x-[20px] bg-green-400 cursor-pointer px-[20px] py-[5px]">
            <p className="self-center text-[14px] text-white">Cao nhất</p>
          </div>
          {priceSort.map((item, index) => {
            return (
              <label
                key={index}
                className="input_checkbox font-normal py-[5px]"
                onClick={() => {
                  handleSelectMaxPrice(item);
                }}
              >
                <div
                  className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
                    maxPrice === item && 'bg-green-100'
                  }`}
                >
                  <p className="self-center text-[16px] text-black">
                    {item === -1 ? 'Tất cả' : formatMoney(item)}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BoxSearchPrice);

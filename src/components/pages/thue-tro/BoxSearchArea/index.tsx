import { formatMoney } from '@/helpers/base.helpers';
import React from 'react';

type Props = {
  selectedItem?: { label: string; value: any };
  handleSelectMinArea: (item: number) => void;
  handleSelectMaxArea: (item: number) => void;
  maxArea: number;
  minArea: number;
};

const areaSort = [-1, 10, 15, 20, 30, 50, 100];

const BoxSearchArea = (props: Props) => {
  const { handleSelectMinArea, handleSelectMaxArea, maxArea, minArea } = props;

  return (
    <div className="selectBox">
      <div className="grid grid-cols-2">
        <div className="col-span-1 border-r">
          <div className="flex item-center gap-x-[20px] bg-green-400 cursor-pointer px-[20px] py-[5px]">
            <p className="self-center text-[14px] text-white">Thấp nhất</p>
          </div>
          {areaSort.map((item, index) => {
            return (
              <label
                key={index}
                className="input_checkbox font-normal py-[5px]"
                onClick={() => {
                  handleSelectMinArea(item);
                }}
              >
                <div
                  className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
                    minArea === item && 'bg-green-100'
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
          {areaSort.map((item, index) => {
            return (
              <label
                key={index}
                className="input_checkbox font-normal py-[5px]"
                onClick={() => {
                  handleSelectMaxArea(item);
                }}
              >
                <div
                  className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
                    maxArea === item && 'bg-green-100'
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

export default React.memo(BoxSearchArea);

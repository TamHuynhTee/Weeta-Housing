import React from 'react';

type Props = {
  selectedItem?: { label: string; value: any };
  handleSelectReason: (item: { label: string; value: string }) => void;
  reason: { label: string; value: string };
  reasons: { label: string; value: string }[];
  name: string;
};

const BoxSelectReason = (props: Props) => {
  const { handleSelectReason, reason, reasons, name } = props;

  return (
    <div className="selectBox">
      <div className="">
        {reasons.map((item, index) => {
          return (
            <label
              key={index}
              className="input_checkbox font-normal py-[5px]"
              onClick={() => {
                handleSelectReason(item);
              }}
              htmlFor={name}
            >
              <div
                className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
                  reason.value === item.value && 'bg-green-100'
                }`}
              >
                <p className="self-center text-[16px] text-black">
                  {item.label}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(BoxSelectReason);

import { DEFAULT_AVATAR } from '@/constants/base.constants';

type Props = {
  isSelected: boolean;
};

const CardChannel = (props: Props) => {
  const { isSelected } = props;

  return (
    <div
      className={`w-full px-[20px] grid grid-cols-5 gap-x-[10px] h-[80px] ${
        isSelected && 'bg-white'
      }`}
    >
      <div className="col-span-4 flex items-center">
        <div className="w-[50px] h-[50px] rounded-[50%] mr-[10px]">
          <img
            src={DEFAULT_AVATAR}
            className="w-full h-full rounded-[50%]"
            alt=""
          />
        </div>
        <div className="flex-1">àqwf</div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default CardChannel;

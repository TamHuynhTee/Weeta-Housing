type Props = {
  items?: Array<{ label: string; value: any }>;
  selectedItem?: { label: string; value: any };
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectDistrict?: (item: { label: string; value: number }) => void;
  htmlFor?: string;
};

const BoxSearchLocation = (props: Props) => {
  const {
    items = [],
    handleSelectDistrict = () => {
      return;
    },
    htmlFor = '',
    selectedItem,
  } = props;

  return (
    <div className="">
      <div className="max-h-[200px] overflow-y-scroll selectBox">
        <label
          htmlFor={htmlFor}
          className="input_checkbox font-normal py-[5px]"
          onClick={() => {
            handleSelectDistrict({ label: 'TP Hồ Chí Minh', value: -1 });
          }}
        >
          <div
            className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
              selectedItem?.value === -1 && 'bg-green-300 text-white'
            }`}
          >
            <p className="self-center text-16px">TP Hồ Chí Minh</p>
          </div>
        </label>
        {items.map((item, index) => {
          return (
            <label
              key={index}
              htmlFor={htmlFor}
              className="input_checkbox font-normal py-[5px]"
              onClick={() => {
                handleSelectDistrict(item);
              }}
            >
              <div
                className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
                  selectedItem?.value === item.value &&
                  'bg-green-300 text-white'
                }`}
              >
                <p className="self-center text-16px">{item.label}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default BoxSearchLocation;

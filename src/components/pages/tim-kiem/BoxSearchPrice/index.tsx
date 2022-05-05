type Props = {
  items?: Array<{ label: string; value: any }>;
  selectedItem?: { label: string; value: any };
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectItem?: (item: { label: string; value: string }) => void;
  htmlFor?: string;
};

const BoxSearchPrice = (props: Props) => {
  const {
    items = [],
    handleSelectItem = () => {
      return;
    },
    htmlFor = '',
  } = props;

  return (
    <div className="max-h-[200px] overflow-y-scroll selectBox">
      <div className="">
        {items.map((item, index) => {
          return (
            <label
              key={index}
              htmlFor={htmlFor}
              className="input_checkbox font-normal py-[5px]"
              onClick={() => {
                handleSelectItem(item);
              }}
            >
              <div className="flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px]">
                <p className="self-center text-16px text-black">{item.label}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default BoxSearchPrice;

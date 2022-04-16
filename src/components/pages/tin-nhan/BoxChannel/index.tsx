import CardChannel from './CardChannel';
import styles from './styles.module.css';

const BoxChannel = () => {
  return (
    <div className="w-full h-full col-span-2 bg-green-100 rounded-tl-[20px] rounded-bl-[20px] py-[20px]">
      <div className="px-[20px]">
        <p className="text-[24px] text-baseColor font-bold leading-[30px]">
          Tin nhắn
        </p>
        <form className="flex items-center my-[10px]">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm cuộc trò chuyện"
              className="w-full h-[40px] bg-white px-[20px] py-[5px] rounded-[20px] outline-none"
            />
          </div>
          <button className="h-[20px] w-[20px] bg-transparent ml-[10px]">
            <img
              src="/icons/ic_search.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        </form>
      </div>
      <div className={`h-[calc(100%-90px)] ${styles.scrollbarChannel}`}>
        <CardChannel isSelected />
        <CardChannel isSelected={false} />
        <CardChannel isSelected={false} />
      </div>
    </div>
  );
};

export default BoxChannel;

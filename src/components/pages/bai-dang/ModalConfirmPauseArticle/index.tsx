const ModalConfirmPauseArticle = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const handlePauseArticle = async () => {
    console.log('confirm');
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[500px]">
      <p className="text-[20px] font-bold text-center mb-[16px]">
        Bạn xác nhận muốn ngưng bài viết?
      </p>
      <p className="text-[16px] font-normal text-center mb-[16px]">
        Bài viết của bạn sẽ không còn hiển thị lên danh sách thuê trọ và sẽ hiện
        tag báo cho người dùng khác
      </p>
      <div className="grid grid-cols-2 gap-x-[10px] mt-[10px]">
        <button
          type="button"
          className="button-outline-primary-grey w-full col-span-1"
          onClick={closeModal}
        >
          Hủy
        </button>
        <button
          type="submit"
          className="button-primary w-full col-span-1"
          onClick={handlePauseArticle}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmPauseArticle;

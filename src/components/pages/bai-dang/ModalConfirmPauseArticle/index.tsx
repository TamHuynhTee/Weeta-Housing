import { useArticle } from '@/stores/Article';
import { useRouter } from 'next/router';

const ModalConfirmPauseArticle = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const [, actionArticle] = useArticle();
  const router = useRouter();
  const articleId = router.query.article as string;

  const handleContinueArticle = async () => {
    const result = await actionArticle.setArticleAvailabilityAsync(articleId, {
      isShow: false,
    });
    if (result) closeModal();
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
          onClick={handleContinueArticle}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmPauseArticle;

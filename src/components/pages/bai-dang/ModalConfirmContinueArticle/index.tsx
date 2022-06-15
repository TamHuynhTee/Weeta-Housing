import { useArticle } from '@/stores/Article';
import { useRouter } from 'next/router';

const ModalConfirmContinueArticle = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const [, actionArticle] = useArticle();
  const router = useRouter();
  const articleId = router.query.article as string;

  const handlePauseArticle = async () => {
    const result = await actionArticle.setArticleAvailabilityAsync(articleId, {
      isShow: true,
    });
    if (result) closeModal();
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[500px]">
      <p className="text-[20px] font-bold text-center mb-[16px]">
        Bạn xác nhận mở lại bài viết?
      </p>
      <p className="text-[16px] font-normal text-center mb-[16px]">
        Bài viết của bạn sẽ hiển thị lại lên danh sách thuê trọ.
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

export default ModalConfirmContinueArticle;

import { useArticle } from '@/stores/Article';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  closeModal: () => void;
}

const ModalConfirmDeleteArticle = ({ closeModal }: Props) => {
  const [, actionArticle] = useArticle();
  const router = useRouter();
  const articleId = router.query.article as string;

  const handleConfirm = async () => {
    const result = await actionArticle.deleteArticleAsync(articleId);
    if (result) {
      closeModal();
      router.push('/thong-tin-ca-nhan/quan-ly-bai-dang/da-duyet');
    }
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[400px]">
      <p className="text-[20px] font-bold text-center mb-[16px]">
        Bạn có chắc muốn xóa bài viết không?
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="button-outline-primary-grey w-full col-span-1"
          onClick={closeModal}
        >
          Hủy
        </button>
        <button
          className="button-red w-full col-span-1"
          onClick={handleConfirm}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmDeleteArticle;

import Breadcrumb from '@/components/common/BreadCrumb';
import ContainerModal from '@/components/common/ContainerModal';
import GoogleMap from '@/components/common/GoogleMap';
import SaveArticleComponent from '@/components/common/SaveArticleComponent';
import LayoutCommon from '@/components/layout/LayoutCommon';
import ImageSlide from '@/components/pages/bai-dang/ImageSlide';
import ModalConfirmPauseArticle from '@/components/pages/bai-dang/ModalConfirmPauseArticle';
import ModalConfirmContinueArticle from '@/components/pages/bai-dang/ModalConfirmContinueArticle';
import ModalReportArticle from '@/components/pages/bai-dang/ModalReportArticle';
import ModalReportLessor from '@/components/pages/bai-dang/ModalReportLessor';
import WidgetLessor from '@/components/pages/bai-dang/WidgetLessor';
import { formatMoney } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import { useArticle } from '@/stores/Article';
import { useAuth } from '@/stores/Auth';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleDetail = () => {
  // Stores
  const [stateAuth] = useAuth();
  const [stateArticle, actionArticle] = useArticle();

  //   Modal states
  const [reportArticleModal, setReportArticleModal] = React.useState(false);

  const openReportArticleModal = () => setReportArticleModal(true);
  const closeReportArticleModal = () => setReportArticleModal(false);

  const [reportLessorModal, setReportLessorModal] = React.useState(false);

  const openReportLessorModal = () => setReportLessorModal(true);
  const closeReportLessorModal = () => setReportLessorModal(false);

  const [pauseArticleModal, setPauseArticleModal] = React.useState(false);

  const openPauseArticleModal = () => setPauseArticleModal(true);
  const closePauseArticleModal = () => setPauseArticleModal(false);

  const [continueArticleModal, setContinueArticleModal] = React.useState(false);

  const openContinueArticleModal = () => setContinueArticleModal(true);
  const closeContinueArticleModal = () => setContinueArticleModal(false);

  //   Router
  const router = useRouter();
  const articleId = router.query.article as string;

  React.useEffect(() => {
    if (articleId) actionArticle.getDetailArticleAsync(articleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  React.useEffect(() => {
    return () => {
      if (stateArticle.articleDetail) actionArticle.setDetailArticle(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = stateArticle.articleDetail;

  return (
    <React.Fragment>
      <LayoutCommon title="Bài viết" isVisibleSearchBar>
        <div className="px-[50px] py-[20px]">
          {data ? (
            !data.isDeleted ? (
              <>
                <Breadcrumb
                  arr_link={[
                    { href: '/', value: 'Weeta' },
                    { href: '/thue-tro', value: 'Thuê trọ' },
                    { href: '/#!', value: `${data?.title}` },
                  ]}
                  classNameContainer="mb-[20px]"
                />
                {data.lessor._id === stateAuth.authId ? (
                  <>
                    <div
                      className={`p-[10px] mb-[10px] text-white rounded-md ${
                        data.isApproved ? 'bg-green-400' : 'bg-orange-500'
                      }`}
                    >
                      {data.isApproved
                        ? 'Bài viết đã được duyệt'
                        : 'Bài viết đang đợi duyệt'}
                    </div>
                    {!data.isAvailable && (
                      <div
                        className={`p-[10px] mb-[20px] text-white rounded-md bg-red-400 flex items-center gap-x-[10px]`}
                      >
                        <span>Bạn đã ngưng bài viết này</span>{' '}
                        <button
                          className="button-blue"
                          onClick={openContinueArticleModal}
                        >
                          Mở lại
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  !data.isAvailable && (
                    <div
                      className={`p-[10px] mb-[20px] text-white rounded-md bg-red-400`}
                    >
                      Bài viết không còn khả dụng
                    </div>
                  )
                )}
                <div className="grid grid-cols-6 gap-[30px] h-full">
                  {/* Detail */}
                  <div className="col-span-4 h-full w-full">
                    <ImageSlide images={data.image} />
                    <div className="flex flex-row-reverse gap-3 mt-[5px]">
                      {data.lessor._id === stateAuth.authId ? (
                        <>
                          <Link
                            href={`/chinh-sua-tin/${data._id}?backURL=/bai-dang/${data._id}`}
                          >
                            <a className="button-blue flex items-center gap-x-[5px]">
                              <span className="h-[20px] w-[20px] object-contain">
                                <img src="/icons/ic_edit.png" alt="image" />
                              </span>
                              Chỉnh sửa
                            </a>
                          </Link>
                          {data.isAvailable && (
                            <a
                              onClick={openPauseArticleModal}
                              className="button-red flex items-center gap-x-[5px]"
                            >
                              <span className="h-[20px] w-[20px] object-contain">
                                <img src="/icons/ic_postpone.png" alt="image" />
                              </span>
                              Ngưng bài viết
                            </a>
                          )}
                        </>
                      ) : (
                        <>
                          <SaveArticleComponent
                            className=""
                            articleId={data._id}
                            isSaved={stateAuth.auth?.saveArticle.includes(
                              data._id
                            )}
                          />
                          <a
                            onClick={openReportArticleModal}
                            className="button-red flex items-center gap-x-[5px]"
                          >
                            <span className="h-[20px] w-[20px] object-contain">
                              <img src="/icons/ic_report.png" alt="image" />
                            </span>
                            Báo cáo
                          </a>
                        </>
                      )}
                    </div>
                    <div className="mt-[20px]">
                      <p className="font-bold text-[24px]">{data.title}</p>
                      <div className="flex items-center gap-x-[10px] mt-[10px]">
                        <div className="h-[24px] w-[24px]">
                          <img
                            src="/icons/ic_location.png"
                            className="w-full h-full object-contain"
                            alt="location"
                          />
                        </div>
                        <p className="font-normal text-[20px] leading-[30px]">
                          {data?.address}
                        </p>
                      </div>
                      <p className="text-[36px] font-bold max_line-2 text-baseColor mt-[10px]">
                        {formatMoney(data.price || 0)}đ
                      </p>
                    </div>
                    <div className="mt-[20px]">
                      <p className="text-black-100 text-[18px] font-bold">
                        Thông tin chính
                      </p>
                      <ul className="list-disc list-inside mt-[10px] grid grid-cols-2">
                        <li className="col-span-1">
                          Diện tích:{' '}
                          <span className="text-baseColor">
                            {data?.area} m<sup>2</sup>
                          </span>
                        </li>
                        <li className="col-span-1">
                          Ngày đăng:{' '}
                          <span className="text-baseColor">
                            {dayjs(data.createdAt).format('DD/MM/YYYY')}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-[20px]">
                      <p className="text-black-100 text-[18px] font-bold">
                        Giới thiệu
                      </p>
                      <p
                        className="text-[16px] mt-[10px]"
                        dangerouslySetInnerHTML={{
                          __html: data.description || '',
                        }}
                      ></p>
                    </div>
                    <div className="mt-[20px]">
                      <p className="text-black-100 text-[18px] font-bold">
                        Bản đồ
                      </p>
                      <div className="w-full h-[400px] mt-[10px]">
                        <GoogleMap />
                      </div>
                    </div>
                  </div>
                  {/* Lessor */}
                  <div className="col-span-2 h-full w-full">
                    <WidgetLessor
                      data={data.lessor}
                      openReportModal={openReportLessorModal}
                    />
                  </div>
                  <ContainerModal
                    isVisible={reportArticleModal}
                    closeModal={closeReportArticleModal}
                  >
                    <ModalReportArticle closeModal={closeReportArticleModal} />
                  </ContainerModal>
                  <ContainerModal
                    isVisible={reportLessorModal}
                    closeModal={closeReportLessorModal}
                  >
                    <ModalReportLessor closeModal={closeReportLessorModal} />
                  </ContainerModal>
                  <ContainerModal
                    isVisible={pauseArticleModal}
                    closeModal={closePauseArticleModal}
                  >
                    <ModalConfirmPauseArticle
                      closeModal={closePauseArticleModal}
                    />
                  </ContainerModal>
                  <ContainerModal
                    isVisible={continueArticleModal}
                    closeModal={closeContinueArticleModal}
                  >
                    <ModalConfirmContinueArticle
                      closeModal={closeContinueArticleModal}
                    />
                  </ContainerModal>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center opacity-30 my-[20px]">
                <div className="w-[200px] h-[200px]">
                  <img
                    src="/icons/ic_no_articles.png"
                    className="w-full h-full object-contain"
                    alt="image"
                  />
                </div>
                <p className="font-bold text-[20px] uppercase">
                  Bài viết không còn tồn tại
                </p>
              </div>
            )
          ) : (
            ''
          )}
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(ArticleDetail, { requiredLogin: false });

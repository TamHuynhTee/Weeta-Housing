import ContainerModal from '@/components/common/ContainerModal';
import InputField from '@/components/common/InputField';
import LineHorizontal from '@/components/common/LineHorizontal';
import SearchBar from '@/components/common/SearchBar';
import { pushSearchQueries } from '@/helpers/base.helpers';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import AreaFilter from '../AreaFilter';
import DistrictFilter from '../DistrictFilter';
import PriceFilter from '../PriceFilter';

const ArticleFilter = () => {
  const [stateFilterModal, setStateFilterModal] = React.useState(false);

  const openModal = () => setStateFilterModal(true);
  const closeModal = () => setStateFilterModal(false);

  const router = useRouter();

  const urlStartDate = router.query.startDate as string;

  const countMoreFilter = urlStartDate ? 1 : undefined;

  return (
    <div className="w-full py-[20px] grid grid-cols-12 gap-1">
      <div className="col-span-2">
        <SearchBar
          className={`pb-[2 px] w-full h-full text-[16px] text-back-100 placeholder-grey-50 bg-green-100 border-0 outline-none`}
        />
      </div>
      <div className="col-span-3">
        <DistrictFilter />
      </div>
      <div className="col-span-3">
        <PriceFilter />
      </div>
      <div className="col-span-3">
        <AreaFilter />
      </div>
      <div className="col-span-1">
        <div
          className="h-full w-full rounded-[3px] py-[3px] cursor-pointer flex border border-gray-200 items-center relative"
          onClick={openModal}
        >
          <div className="w-[38px] h-[38px] ml-[10px]">
            <img
              src="/icons/ic_more_filter.png"
              alt="box_icon"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="px-[10px] appearance-none outline-none select-none text-black text-[16px] font-normal w-full max_line-1 capitalize">
            Thêm
          </span>
          {countMoreFilter && (
            <div className="absolute top-[-10px] right-[-10px] h-[20px] w-[20px] rounded-[50%] bg-baseColor flex justify-center items-center text-white">
              {countMoreFilter}
            </div>
          )}
        </div>
      </div>

      <ContainerModal isVisible={stateFilterModal} closeModal={closeModal}>
        <ModalMoreFilter closeModal={closeModal} />
      </ContainerModal>
    </div>
  );
};

interface Props {
  closeModal: () => void;
}

const ModalMoreFilter = (props: Props) => {
  const { closeModal } = props;
  const { register, handleSubmit, reset, setValue } = useForm();
  const router = useRouter();

  const urlStartDate = router.query.startDate as string;

  const handleFilter = (data: any) => {
    pushSearchQueries(router, { startDate: data.startDate });

    closeModal();
  };

  const handleClearFilter = () => {
    reset();
    delete router.query.startDate;
    pushSearchQueries(router, {});
  };

  React.useEffect(() => {
    if (urlStartDate) setValue('startDate', urlStartDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlStartDate]);

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[400px]">
      <div className="flex justify-between items-center pb-[5px] border-b">
        <p className="text-[24px] font-bold">Bộ lọc</p>
        <p
          className="text-gray-500 text-[16px] cursor-pointer"
          onClick={closeModal}
        >
          Đóng
        </p>
      </div>

      <form className="py-[10px]" onSubmit={handleSubmit(handleFilter)}>
        <div className="">
          <InputField
            type="date"
            register={register('startDate')}
            name="startDate"
            label="Tin đăng từ"
            maxDate={dayjs().format('YYYY-MM-DD')}
          />
        </div>
        {/* <div className="mt-[10px]">
          <InputField
            type="date"
            register={register('startDate')}
            name="startDate"
            label="Ngày đăng tin"
          />
        </div> */}

        <div className="mt-[10px]">
          <LineHorizontal />
        </div>
        <div className="mt-[10px]">
          <button type="submit" className="button-primary w-full mb-[10px]">
            Áp dụng bộ lọc
          </button>
          <button
            type="button"
            className="button-outline-primary-grey w-full"
            onClick={handleClearFilter}
          >
            Xóa bộ lọc
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleFilter;

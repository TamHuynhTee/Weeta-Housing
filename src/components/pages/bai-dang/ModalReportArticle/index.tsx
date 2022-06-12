import ErrorText from '@/components/common/ErrorText';
import LimitedTextArea from '@/components/common/LimitedTextArea';
import SelectBoxField from '@/components/common/SelectBoxField';
import { ENUM_TYPE_REASON } from '@/constants/base.constants';
import Hook from '@/hooks/Report/reason.hook';
import { useReport } from '@/stores/Report';
import React from 'react';
import { useForm } from 'react-hook-form';
import BoxSelectReason from '../BoxSelectReason';

const ModalReportArticle = ({ closeModal }: { closeModal: () => void }) => {
  //   const router = useRouter();
  const [stateReport, actionReport] = useReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm();

  const { handleSelectReason, selectedReason, setSelectedReason } =
    Hook.useSelectReason({
      setValue,
      clearErrors,
    });

  const reasons = stateReport.reasonsArticle.list.map((item) => {
    return { label: item.title, value: item.title };
  });

  React.useEffect(() => {
    (async () => {
      await actionReport.getListReasonAsync({ type: ENUM_TYPE_REASON.ARTICLE });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = (data: any) => {
    console.log(data);
  };

  const handleCloseModal = () => {
    reset();
    setSelectedReason({
      label: 'Chọn một lý do báo cáo',
      value: '',
    });
    closeModal();
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[500px]">
      <p className="text-[20px] font-bold text-center mb-[16px]">
        Báo cáo bài viết
      </p>
      <form className="my-[15px]" onSubmit={handleSubmit(handleConfirm)}>
        <div className="">
          <SelectBoxField
            id="reasonArticle"
            state={selectedReason.label}
            name="reasonArticle"
            registerForm={register('reasonArticle', {
              required: 'Xin hãy chọn một lý do',
            })}
            errors={errors}
            showLabel
            overrideClassNameContainer
            classNameContainer="min-w-[200px]"
            label="Chọn một lý do"
          >
            <BoxSelectReason
              handleSelectReason={handleSelectReason}
              reason={selectedReason}
              reasons={reasons}
              name="reasonArticle"
            />
          </SelectBoxField>
        </div>
        <div className="mt-[20px]">
          <label
            htmlFor="reportDescription"
            className="block font-semibold mb-[10px]"
          >
            Mô tả chi tiết
          </label>
          <LimitedTextArea
            name="reportDescription"
            id="reportDescription"
            registerForm={register('reportDescription', {
              required: 'Xin hãy mô tả lý do',
            })}
            limit={600}
            value=""
            placeholder="Mô tả lý do báo cáo bài viết"
          />
          {errors.reportDescription && (
            <ErrorText>{errors.reportDescription.message}</ErrorText>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-[10px] mt-[10px]">
          <button
            type="button"
            className="button-outline-primary-grey w-full col-span-1"
            onClick={handleCloseModal}
          >
            Hủy
          </button>
          <button type="submit" className="button-primary w-full col-span-1">
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalReportArticle;

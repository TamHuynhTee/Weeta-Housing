import InputCheckbox from '@/components/common/InputCheckbox';
import InputMoney from '@/components/common/InputMoney';
import Select from '@/components/common/Select';
import {
  ELECTRIC_UNIT,
  FACILITIES,
  LIMIT_TIME,
  PLACES_AROUND,
  TYPE_USER,
  WATER_UNIT,
  WIFI_UNIT,
} from '@/constants/base.constants';
import {
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

const FacilitiesForm = ({
  register,
  setValue,
  clearErrors,
}: {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}) => {
  return (
    <div className="grid grid-cols-11">
      {/* LEFT */}
      <div className="col-span-5 grid gap-[10px]">
        <p className="text-[20px] font-semibold text-orange-400 text-center">
          Tiện ích phòng trọ
        </p>
        <div className="grid grid-cols-1 gap-[5px] mt-[10px]">
          <label
            htmlFor="facilities.typeUser"
            className="col-span-1 flex items-center gap-x-[10px]"
          >
            <span className="h-[20px] w-[20px]">
              <img
                src={'/icons/ic_facilities_typeUser.png'}
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            Đối tượng cho thuê
          </label>
          <div className="col-span-1 grid grid-cols-2 gap-[5px] mt-[5px]">
            {TYPE_USER.map((item, index) => (
              <InputCheckbox
                key={index}
                className="col-span-1"
                register={register(`facilities.typeUser.${item.register}`)}
                name={`facilities.typeUser.${item.register}`}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[5px]">
          <label
            htmlFor="facilities.electric.price"
            className="col-span-1 flex items-center gap-x-[10px]"
          >
            <span className="h-[20px] w-[20px]">
              <img
                src={'/icons/ic_facilities_electric.png'}
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            Điện
          </label>
          <div className="col-span-4">
            <InputMoney
              name="facilities.electric.price"
              register={register('facilities.electric.price')}
              placeholder={'Giá điện'}
              setValue={setValue}
              clearError={clearErrors}
              id={'facilities.electric.price'}
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <Select
              register={register('facilities.electric.unit')}
              options={ELECTRIC_UNIT}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[5px]">
          <label
            htmlFor="facilities.water.price"
            className="col-span-1 flex items-center gap-x-[10px]"
          >
            <span className="h-[20px] w-[20px]">
              <img
                src={'/icons/ic_facilities_water.png'}
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            Nước
          </label>
          <div className="col-span-4">
            <InputMoney
              name="facilities.water.price"
              register={register('facilities.water.price')}
              placeholder={'Giá nước'}
              setValue={setValue}
              clearError={clearErrors}
              id="facilities.water.price"
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <Select
              register={register('facilities.water.unit')}
              options={WATER_UNIT}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[5px]">
          <label
            htmlFor="facilities.wifi.price"
            className="col-span-1 flex items-center gap-x-[10px]"
          >
            <span className="h-[20px] w-[20px]">
              <img
                src={'/icons/ic_facilities_wifi.png'}
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            Wifi
          </label>
          <div className="col-span-4">
            <InputMoney
              name="facilities.wifi.price"
              register={register('facilities.wifi.price')}
              placeholder={'Giá wifi'}
              setValue={setValue}
              clearError={clearErrors}
              id="facilities.wifi.price"
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <Select
              register={register('facilities.wifi.unit')}
              options={WIFI_UNIT}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[5px]">
          <label
            htmlFor="facilities.limitTime"
            className="col-span-2 flex items-center gap-x-[10px]"
          >
            <span className="h-[20px] w-[20px]">
              <img
                src={'/icons/ic_facilities_limit_time.png'}
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            Giờ giấc
          </label>
          <div className="col-span-5">
            <Select
              register={register('facilities.limitTime')}
              options={LIMIT_TIME}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[5px]">
          {FACILITIES.map((item, index) => (
            <InputCheckbox
              key={index}
              register={register(`facilities.${item.register}`)}
              name={`facilities.${item.register}`}
              label={
                <div className="flex items-center gap-x-[10px]">
                  <span className="h-[20px] w-[20px]">
                    <img
                      src={item.icon}
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </span>
                  {item.label}
                </div>
              }
            />
          ))}
        </div>
      </div>
      <div className="col-span-1 border mx-auto w-[1px] h-full"></div>
      {/* RIGHT */}
      <div className="col-span-5">
        <p className="text-[20px] font-semibold text-orange-400 text-center">
          Khu vực lân cận
        </p>
        <p className="text-[16px] font-normal text-black text-center">
          (Trong bán kính 1km)
        </p>
        <div className="grid grid-cols-2 gap-[10px] mt-[10px]">
          {PLACES_AROUND.map((item, index) => (
            <InputCheckbox
              key={index}
              className="col-span-1"
              register={register(`facilities.places_around.${item.register}`)}
              name={`facilities.places_around.${item.register}`}
              label={
                <div className="flex items-center gap-x-[10px]">
                  <span className="h-[20px] w-[20px]">
                    <img
                      src={item.icon}
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </span>
                  {item.label}
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesForm;

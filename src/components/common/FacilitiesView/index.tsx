import {
  ELECTRIC_UNIT,
  LIMIT_TIME,
  PLACES_AROUND,
  TYPE_USER,
  WATER_UNIT,
  WIFI_UNIT,
} from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import { FACILITIES_MODEL } from '@/models/Article.model';

const FacilitiesView = ({ facilities }: { facilities: FACILITIES_MODEL }) => {
  return (
    <>
      <ul className="mt-[10px] grid grid-cols-3 gap-y-[20px]">
        {/* row 1 */}
        <li className="col-span-1">
          <div className="flex items-center gap-x-[10px]">
            <span className="h-[20px] w-[20px]">
              <img
                src="/icons/ic_facilities_electric.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            <span className="font-semibold">Điện:</span>{' '}
            {facilities.electric.price
              ? `${formatMoney(facilities.electric.price || 0)} /${
                  ELECTRIC_UNIT.find(
                    (item) => item.value === facilities.electric.unit
                  )?.label
                }`
              : 'Miễn phí'}
          </div>
        </li>
        <li className="col-span-1">
          <div className="flex items-center gap-x-[10px]">
            <span className="h-[20px] w-[20px]">
              <img
                src="/icons/ic_facilities_water.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            <span className="font-semibold">Nước:</span>{' '}
            {facilities.water.price
              ? `${formatMoney(facilities.water.price || 0)} /${
                  WATER_UNIT.find(
                    (item) => item.value === facilities.water.unit
                  )?.label
                }`
              : 'Miễn phí'}
          </div>
        </li>
        <li className="col-span-1">
          <div className="flex items-center gap-x-[10px]">
            <span className="h-[20px] w-[20px]">
              <img
                src="/icons/ic_facilities_wifi.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            <span className="font-semibold">Wifi:</span>{' '}
            {facilities.wifi.price
              ? `${formatMoney(facilities.wifi.price || 0)} /${
                  WIFI_UNIT.find((item) => item.value === facilities.wifi.unit)
                    ?.label
                }`
              : 'Miễn phí'}
          </div>
        </li>
        {/* row 2 */}
        <li className="col-span-1">
          <div className="flex items-center gap-x-[10px]">
            <span className="h-[20px] w-[20px]">
              <img
                src="/icons/ic_facilities_limit_time.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            <span className="font-semibold">Giờ giấc:</span>{' '}
            {
              LIMIT_TIME.find((item) => item.value === facilities.limitTime)
                ?.label
            }
          </div>
        </li>
        <li className="col-span-1">
          <div className="flex items-center gap-x-[10px]">
            <span className="h-[20px] w-[20px]">
              <img
                src="/icons/ic_facilities_parking.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            <span className="font-semibold">Gửi xe:</span>{' '}
            {facilities.parking ? 'Có chỗ để xe riêng' : 'Không có chỗ để xe'}
          </div>
        </li>
        <li className="col-span-1">
          <div className="flex items-center gap-x-[10px]">
            <span className="h-[20px] w-[20px]">
              <img
                src="/icons/ic_facilities_live_with_owner.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </span>
            <span className="font-semibold">Sống chung với chủ:</span>{' '}
            {facilities.liveWithOwner ? 'Có' : 'Không'}
          </div>
        </li>
      </ul>
      {facilities.places_around.length > 0 && (
        <>
          <p className="text-sky-600 text-[18px] font-semibold text-center mt-[20px]">
            Tiện ích lân cận
          </p>
          <ul className="mt-[10px] grid grid-cols-3 gap-y-[20px]">
            {facilities.places_around.map((item, index) => (
              <li key={index} className="col-span-1">
                <div className="flex items-center gap-x-[10px]">
                  <span className="h-[20px] w-[20px]">
                    <img
                      src={
                        PLACES_AROUND.find((ele) => ele.register === item)?.icon
                      }
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </span>
                  <span className="font-semibold">
                    {PLACES_AROUND.find((ele) => ele.register === item)?.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="text-sky-600 text-[18px] font-semibold text-center mt-[20px]">
        Đối tượng cho thuê
      </p>
      {facilities.typeUser.length > 0 ? (
        <ul className="mt-[10px] flex items-center flex-wrap gap-x-[20px]">
          {facilities.typeUser.map((item, index) => (
            <li key={index} className="col-span-1">
              <div className="rounded-full bg-orange-500 p-[10px]">
                <span className="font-semibold text-white">
                  #{TYPE_USER.find((ele) => ele.register === item)?.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-full bg-black p-[10px] inline-block">
          <span className="font-semibold text-white">Bất kỳ ai</span>
        </div>
      )}
    </>
  );
};

export default FacilitiesView;

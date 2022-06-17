import dayjs from 'dayjs';
import { NextRouter, useRouter } from 'next/router';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { DISTRICTS } from '@/constants/location.constants';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('vi', {
  weekdays: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
});

export const formatMoney = (money: number): string =>
  money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const saveToLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const getFromLocalStorage = (key: string): any => {
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  const parsedValue = JSON.parse(value);
  return parsedValue;
};

export const getLengthArray = (array: any[]): number => array.length;

export const isFileImage = (file: File) => {
  return file && file['type'].split('/')[0] === 'image';
};

export const isFile = (input: any) => {
  if ('File' in window && input instanceof File) return true;
  else return false;
};

export const isBlob = (input: any) => {
  if ('Blob' in window && input instanceof Blob) return true;
  else return false;
};

export const detectMediaString = (media: string): 'image' | 'video' => {
  const checkImage =
    /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(media);
  return checkImage ? 'image' : 'video';
};

export const isCurrentLink = (link: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return router.asPath.includes(link);
};

export const formatChannelMessageTime = (date: string | undefined) => {
  const formatDate = dayjs(date).format('YYYY-MM-DD');
  if (formatDate === dayjs().format('YYYY-MM-DD'))
    return dayjs(date).format('HH:mm');
  const dayDistance = dayjs(formatDate).diff(dayjs(), 'days');
  if (dayDistance === -1) return `Hôm qua`;
  if (dayDistance >= -7 && dayDistance < -1) return dayjs(date).fromNow();
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

export const formatChatMessageTime = (date: string | undefined) => {
  const formatDate = dayjs(date).format('YYYY-MM-DD');
  if (formatDate === dayjs().format('YYYY-MM-DD'))
    return dayjs(date).format('HH:mm');
  const dayDistance = dayjs(formatDate).diff(dayjs(), 'days');
  if (dayDistance === -1) return `Hôm qua, ${dayjs(date).format('HH:mm')}`;
  if (dayDistance < -1) return dayjs(date).format('DD/MM/YYYY HH:mm');
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

export const formatArticleTime = (date: string | undefined) => {
  const formatDate = dayjs(date).format('YYYY-MM-DD');
  if (formatDate === dayjs().format('YYYY-MM-DD')) return `Hôm nay`;
  const dayDistance = dayjs(formatDate).diff(dayjs(), 'days');
  if (dayDistance === -1) return `Hôm qua`;
  if (dayDistance < -1) return dayjs(date).format('DD/MM/YYYY');
  return dayjs(date).format('DD/MM/YYYY');
};

export const isShowTimeMessageBetween = (time: number, time2: number) => {
  const currentTime = new Date().getTime();
  const timeMessage = new Date(currentTime - time).getTime();
  const timeMessageInMinutes = timeMessage / 1000 / 60;
  const timeMessage2 = new Date(currentTime - time2).getTime();
  const timeMessage2InMinutes = timeMessage2 / 1000 / 60;
  if (timeMessage2InMinutes - timeMessageInMinutes > 5) {
    return true;
  }
  return false;
};

export const getProvince = (code: number) => {
  return DISTRICTS.find((item) => item.value === code) as {
    label: string;
    value: number;
  };
};

export const getSplitPathName = (pathName: string, index: number) => {
  if (index < 0) return '';
  return pathName.split('/')[index] || '';
};

export const moneyConverter = (rawMoney: string | undefined) => {
  if (!rawMoney) return '';
  return +rawMoney.split('.').join('');
};

export const pushSearchQueries = (
  router: NextRouter,
  query: any,
  urlDistrict?: any
) => {
  const district = urlDistrict || router.query.district;
  delete router.query.district;
  router.push({
    pathname: district ? `/thue-tro/${district}` : '/thue-tro',
    query: { ...router.query, ...query },
  });
};

export const getIndexOfTrueItems = (arr: any[]) => {
  return arr.reduce(
    (out: any, bool, index) => (bool ? out.concat(index) : out),
    []
  );
};

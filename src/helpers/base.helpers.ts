import dayjs from 'dayjs';
import { useRouter } from 'next/router';

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

export const isCurrentLink = (link: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return router.asPath.includes(link);
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

export const isShowTimeMessageBetween = (time: number, time2: number) => {
  const currentTime = new Date().getTime();
  const timeMessage = new Date(currentTime - time).getTime();
  const timeMessageInMinutes = timeMessage / 1000 / 60;
  const timeMessage2 = new Date(currentTime - time2).getTime();
  const timeMessage2InMinutes = timeMessage2 / 1000 / 60;
  if (timeMessage2InMinutes - timeMessageInMinutes > 1) {
    return true;
  }
  return false;
};

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

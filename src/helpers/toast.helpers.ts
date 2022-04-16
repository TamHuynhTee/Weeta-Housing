import toast from 'react-hot-toast';

export const notify = (msg: string) => toast(msg);

export const notifyError = (msg: string) =>
  toast.error(msg, { duration: 2000 });

export const notifySuccess = (msg: string) =>
  toast.success(msg, { duration: 2000 });

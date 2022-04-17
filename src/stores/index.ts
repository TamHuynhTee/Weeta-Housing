export interface BaseAction<T> {
  setState: any;
  getState: () => T;
  dispatch: any;
}

export const DEFAULT_SERVER_ERROR_MESSAGE = 'Có lỗi xảy ra, vui lòng thử lại';

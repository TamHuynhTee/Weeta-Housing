import { isBlob, isFile } from './../../../helpers/base.helpers';
import axiosClient from './clientAxios';

const getFormData = (object: Record<string, unknown>) =>
  Object.keys(object).reduce((formData, key) => {
    const value: string =
      typeof object[key] === 'string'
        ? (object[key] as string)
        : JSON.stringify(object[key]);
    formData.append(key, value);
    return formData;
  }, new FormData());

// const getFormDataFile = (object: Record<string, unknown>) =>
//   Object.keys(object).reduce((formData, key) => {
//     const value: string | Blob =
//       typeof object[key] === 'number'
//         ? JSON.stringify(object[key])
//         : (object[key] as string | Blob);
//     formData.append(key, value);
//     return formData;
//   }, new FormData());

// const getFormDataMultiFile = (object: Record<string, unknown>) =>
//   Object.keys(object).reduce((formData, key) => {
//     if (typeof object[key] === 'number') {
//       formData.append(key, JSON.stringify(object[key]));
//     } else if (typeof object[key] === 'string') {
//       formData.append(key, object[key] as string);
//     } else {
//       const objectValue = Object.values(object[key] as Array<any>);
//       if (objectValue.length > 0) {
//         for (let i = 0; i < objectValue.length; i++) {
//           formData.append(key, JSON.stringify(objectValue[i]));
//         }
//       } else {
//         formData.append(key, JSON.stringify(object[key]));
//       }
//     }
//     return formData;
//   }, new FormData());

export const getFormDataV2 = (object: Record<string, unknown>) =>
  Object.keys(object).reduce((formData, key) => {
    const listValue: Array<any> = Array.isArray(object[key])
      ? (object[key] as Array<any>)
      : [object[key]];
    console.log(
      `LHA:  ===> file: repositoryApi.ts ===> line 46 ===> listValue`,
      Array.isArray(object[key]),
      listValue
    );
    listValue.forEach((value) => {
      if (typeof value === 'string' || isBlob(value) || isFile(value)) {
        formData.append(key, value);
      } else if (typeof value === 'number') {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }, new FormData());

const API = {
  get: (url: string, params: Record<string, unknown> = {}): Promise<any> => {
    return axiosClient.get(url, { params });
  },
  post: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.post(url, payload.body, {
      params: payload.params,
    });
  },
  postFormData: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.post(url, getFormDataV2(payload.body || {}), {
      params: payload.params,
    });
  },
  postFormDataFile: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.post(url, getFormDataV2(payload.body || {}), {
      params: payload.params,
    });
  },
  put: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.put(url, payload.body, {
      params: payload.params,
    });
  },
  putFormData: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.put(url, getFormDataV2(payload.body || {}), {
      params: payload.params,
    });
  },

  putFormDataFile: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.put(url, getFormDataV2(payload.body || {}), {
      params: payload.params,
    });
  },
  // putFormDataFile
  patch: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.patch(url, payload.body, {
      params: payload.params,
    });
  },
  patchFormData: (
    url: string,
    payload: {
      params?: Record<string, unknown>;
      body?: Record<string, unknown>;
    } = {
      params: {},
      body: {},
    }
  ): Promise<any> => {
    return axiosClient.patch(url, getFormData(payload.body || {}), {
      params: payload.params,
    });
  },
  delete: (url: string, params: Record<string, unknown> = {}): Promise<any> => {
    return axiosClient.delete(url, { params });
  },
};
export default API;

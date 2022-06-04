import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { IPayment } from '@/services/apis/Payment/Payment.interface';
import { createHook, createStore } from 'react-sweet-state';
import { setPayment } from './payment.action';
import { selector } from './payment.selector';

export type State = {
  payment: {
    type: ENUM_PAYMENT_TYPE | undefined;
    paymentData: undefined | IPayment;
  };
};

const initialState: State = {
  payment: {
    type: undefined,
    paymentData: undefined,
  },
};

const actions = {
  setPayment,
};

const Store = createStore({
  initialState,
  actions,
});

export const usePayment = createHook(Store, { selector: selector });

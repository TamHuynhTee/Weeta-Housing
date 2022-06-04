import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { IPayment } from '@/services/apis/Payment/Payment.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const setPayment =
  (type: ENUM_PAYMENT_TYPE | undefined, data: undefined | IPayment) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      payment: {
        ...getState().payment,
        type: type,
        paymentData: data,
      },
    });
  };

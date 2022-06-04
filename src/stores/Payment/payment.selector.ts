import { State } from './index';
export const selector = (state: State) => {
  return {
    payment_type: state.payment.type,
    payment_data: state.payment.paymentData,
  };
};

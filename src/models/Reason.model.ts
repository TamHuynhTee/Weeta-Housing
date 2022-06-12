import { ENUM_TYPE_REASON } from '@/constants/base.constants';

export interface REASON_MODEL {
  readonly _id: string;
  title: string;
  type: ENUM_TYPE_REASON;
}

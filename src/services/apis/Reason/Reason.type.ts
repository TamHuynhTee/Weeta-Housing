import { REASON_MODEL } from '@/models/Reason.model';

export type resGetReasons = {
  reasons: Array<REASON_MODEL>;
  total: number;
};

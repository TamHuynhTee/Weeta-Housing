export interface MESSAGE_MODEL {
  readonly _id: string;
  conversation: string;
  text: string;
  status: number;
  isSeen: number;
  isDelete: number;
  createdAt: string;
  modifiedAt: string;
  sender: string;
}

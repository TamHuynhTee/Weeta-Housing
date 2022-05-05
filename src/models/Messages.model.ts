export interface MESSAGE_MODEL {
  readonly _id: string;
  conversation: string;
  text: string;
  isSeen: number;
  status: number;
  createdAt: string;
  modifiedAt: string;
  sendError?: boolean;
}

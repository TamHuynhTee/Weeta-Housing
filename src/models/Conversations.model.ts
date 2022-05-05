export interface CONVERSATION_MODEL {
  readonly _id: string;
  members: Array<CONVERSATION_MEMBER>; // populate _id, ava, fullname
  status: number;
  latestMessage: LATEST_MESSAGE;
  conversationName: string;
  createdAt: string;
  amountOfNotSeenMess: number;
}

export interface LATEST_MESSAGE {
  readonly _id: string;
  sender: string; // populate _id, ava, fullname
  data: string;
  isSeen: number;
  status: number;
  createdAt: string;
}

export interface CONVERSATION_MEMBER {
  readonly _id: string;
  fullname: string;
  avatar: string;
}

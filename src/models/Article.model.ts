export interface ARTICLE_MODEL {
  readonly _id: string;
  title: boolean;
  image: Array<string>;
  price: number;
  area: number;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  isApproved: boolean;
  isAvailable: boolean;
  isDelete: boolean;
  createdAt: boolean;
}

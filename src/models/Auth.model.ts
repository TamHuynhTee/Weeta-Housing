import { ImageModel } from './Image.model';

interface AUTH_USER {
  _id: string;
  avatar: ImageModel;
}

export interface AUTH_MODEL {
  user: AUTH_USER | null;
  lessor: AUTH_USER | null;
}

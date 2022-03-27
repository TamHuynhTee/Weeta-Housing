import { ImageModel } from './Image.model';

interface authUser {
  _id: string;
  avatar: ImageModel;
}

export interface authModel {
  user: authUser | null;
  owner: authUser | null;
}

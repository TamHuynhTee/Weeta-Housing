import { ARTICLE_MODEL } from '@/models/Article.model';

export type resGetListArticle = {
  data: ARTICLE_MODEL;
  total: number;
  isOver: boolean;
};

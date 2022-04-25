import { ARTICLE_MODEL } from '@/models/Article.model';

export type resVerifyOTP = {
  identify: {
    message: string;
    otp: number;
  };
};

export type resGetLessorArticles = {
  articles: Array<ARTICLE_MODEL>;
  total: number;
};

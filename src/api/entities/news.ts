export interface NewsSource {
  name: string;
  url: string;
  description?: string;
}

export interface NewsSeoDetails {
  title: string;
  description: string;
  keywords: string;
  ogimage: string;
}

export interface News {
  _id: string;
  refid: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  banner_image: string;
  mobile_banner_image: string;
  banner_image_alt: string;
  thumbnail: string;
  thumbnail_alt: string;
  priority: number;
  overview: string;
  images: string[];
  sources: NewsSource[];
  category: string;
  tags: string[];
  author: string;
  publish_date: string;
  featured: boolean;
  breaking_news: boolean;
  seodetails: NewsSeoDetails;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsPage {
  _id: string;
  refid: string;
  title: string;
  image: string;
  mobileImg: string;
  description: string;
  seodetails: NewsSeoDetails;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsCreateRequest {
  title: string;
  description: string;
  content?: string;
  banner_image?: string | File;
  mobile_banner_image?: string | File;
  banner_image_alt?: string;
  thumbnail?: string | File;
  thumbnail_alt?: string;
  priority?: number;
  overview?: string;
  images?: (string | File)[];
  sources?: NewsSource[];
  category?: string;
  tags?: string[];
  author?: string;
  publish_date?: string;
  featured?: boolean;
  breaking_news?: boolean;
  seodetails?: NewsSeoDetails;
  isActive?: boolean;
}

export interface NewsUpdateRequest extends Partial<NewsCreateRequest> {}

export interface NewsStatusUpdateRequest {
  isActive: boolean;
}

export interface NewsPageUpdateRequest {
  title: string;
  image?: string | File;
  mobileImg?: string | File;
  description?: string;
  seodetails?: NewsSeoDetails;
  isActive?: boolean;
}

export interface NewsListResponse {
  success: boolean;
  APIType: string;
  APIVersion: number;
  error_code: string;
  error_message: string;
  result: News[];
}

export interface NewsResponse {
  success: boolean;
  APIType: string;
  APIVersion: number;
  error_code: string;
  error_message: string;
  result: News;
}

export interface NewsPageResponse {
  success: boolean;
  APIType: string;
  APIVersion: number;
  error_code: string;
  error_message: string;
  result: NewsPage;
}

export interface NewsFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: boolean;
  category?: string;
  featured?: boolean;
  breaking_news?: boolean;
  sortBy?: string;
  sortOrder?: number;
}

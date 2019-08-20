export enum GitHubCategory {
  Repositories = 'Repositories',
  Users = 'Users'
}

// tslint:disable-next-line:no-empty-interface
export interface GitHubSearchItemResponse {}

export interface GitHubSearchResponse {
  total_count?: number;
  items?: GitHubSearchItemResponse[];
}

export interface SearchQuery {
  query: string;
  type: GitHubCategory;
  sort?: string;
  order?: string;
  page?: string;
}

export interface PageInfo {
  currentPage?: string;
  previousPage?: string;
  nextPage?: string;
  totalPage?: string;
}

export interface SearchResultItem {
  githubUrl?: string;
  component?: any;
  type: GitHubCategory;
}

export interface SearchResultError {
  originalError?: any;
  message?: string;
}

export interface SearchResult<T extends SearchResultItem> {
  query: SearchQuery;
  totalCount?: number;
  pageInfo?: PageInfo;
  items?: T[];
  error?: SearchResultError;
}

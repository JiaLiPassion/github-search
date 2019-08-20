import { GitHubSearchItemResponse, SearchResultItem, GitHubCategory } from './model';

export interface GitHubRepositoryResponse extends GitHubSearchItemResponse {
  id?: number;
  full_name?: string;
  description?: string;
  html_url?: string;
  owner?: {
    login?: string;
  };
}

export interface Repository extends SearchResultItem {
  id?: number;
  description?: string;
  name?: string;
  owner?: {
    login?: string;
    url?: string;
  };
}

export function mapGitHubRepositoryResponseToRepository(
  repositoryResponse: GitHubRepositoryResponse
) {
  return {
    type: GitHubCategory.Repositories,
    id: repositoryResponse.id,
    description: repositoryResponse.description,
    owner: repositoryResponse.owner,
    githubUrl: repositoryResponse.html_url,
    name: repositoryResponse.full_name
  };
}

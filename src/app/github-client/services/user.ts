import { GitHubSearchItemResponse, SearchResultItem, GitHubCategory } from './model';

export interface GitHubUserResponse extends GitHubSearchItemResponse {
  login?: string;
  url?: string;
  id?: number;
  avatar_url?: string;
  followers_url?: string;
  html_url?: string;
}

export interface User extends SearchResultItem {
  login?: string;
  url?: string;
  id?: number;
  avatarUrl?: string;
  profileUrl?: string;
  followerCount?: number;
  starredCount?: number;
}

export function mapGitHubUserResponseToUser(userResponse: GitHubUserResponse) {
  return {
    login: userResponse.login,
    githubUrl: userResponse.html_url,
    id: userResponse.id,
    avatarUrl: userResponse.avatar_url,
    type: GitHubCategory.Users
  };
}

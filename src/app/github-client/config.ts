import { InjectionToken } from '@angular/core';

export interface GitHubConfig {
  baseUrl: string;
  page: string;
  htmlUrl: string;
}
export const GITHUB_BASE_URL_CONFIG = new InjectionToken<GitHubConfig>('github.baseurl');

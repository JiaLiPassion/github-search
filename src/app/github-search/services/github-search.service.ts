import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import {
  GitHubCategory,
  GitHubClientService,
  SearchResult,
  SearchResultItem,
  SearchQuery
} from '@github-search/client/index';

@Injectable({
  providedIn: 'root'
})
export class GitHubSearchService {
  constructor(private githubClient: GitHubClientService) {}

  search(searchQuery: SearchQuery): Observable<SearchResult<SearchResultItem>> {
    if (searchQuery.type === GitHubCategory.Repositories) {
      return this.githubClient.searchRepositories(searchQuery);
    }
    if (searchQuery.type === GitHubCategory.Users) {
      return this.githubClient.searchUsers(searchQuery);
    }
    return of(null);
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GITHUB_BASE_URL_CONFIG, GitHubConfig } from '../config';
import { Observable, of, combineLatest } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  SearchResult,
  SearchResultItem,
  GitHubSearchResponse,
  GitHubSearchItemResponse,
  GitHubCategory,
  SearchQuery
} from './model';
import { User } from './user';
import { GitHubUserService } from './github-user.service';
import { GitHubRepositoryService } from './github-repository.service';

@Injectable({
  providedIn: 'root'
})
export class GitHubClientService {
  constructor(
    private userService: GitHubUserService,
    private repoService: GitHubRepositoryService
  ) {}

  searchRepositories(searchQuery: SearchQuery) {
    return this.repoService.searchRepositories(searchQuery);
  }

  searchUsers(searchQuery: SearchQuery): Observable<SearchResult<User>> {
    return this.userService.searchUsers(searchQuery);
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GITHUB_BASE_URL_CONFIG, GitHubConfig } from '../config';
import { GitHubCategory, SearchQuery, SearchResult } from './model';
import { handleGitHubDataRequest } from './github-generic.service';
import { mapGitHubRepositoryResponseToRepository, Repository } from './repository';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubRepositoryService {
  constructor(
    private http: HttpClient,
    @Inject(GITHUB_BASE_URL_CONFIG) private config: GitHubConfig
  ) {}

  searchRepositories(searchQuery: SearchQuery): Observable<SearchResult<Repository>> {
    return handleGitHubDataRequest<any, any>(
      this.config,
      this.http,
      GitHubCategory.Repositories,
      {
        ...searchQuery,
        type: GitHubCategory.Repositories
      },
      mapGitHubRepositoryResponseToRepository
    ).pipe(
      map(sr => ({
        ...sr,
        items: sr.items.map(item => ({
          ...item,
          owner: { ...item.owner, url: `${this.config.htmlUrl}/${item.owner.login}` }
        }))
      }))
    );
  }
}

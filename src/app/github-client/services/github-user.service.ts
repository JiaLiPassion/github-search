import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GITHUB_BASE_URL_CONFIG, GitHubConfig } from '../config';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SearchResult, GitHubCategory, SearchQuery } from './model';
import { User, GitHubUserResponse, mapGitHubUserResponseToUser } from './user';
import { handleGitHubDataRequest } from './github-generic.service';
import { GitHubPageService } from './github-count.service';

@Injectable({
  providedIn: 'root'
})
export class GitHubUserService {
  constructor(
    private http: HttpClient,
    private countService: GitHubPageService,
    @Inject(GITHUB_BASE_URL_CONFIG) private config: GitHubConfig
  ) {}

  private getUserWithFollowerCount(user: User) {
    return this.countService.getCount(`${this.config.baseUrl}/users/${user.login}/followers`).pipe(
      map(count => ({
        ...user,
        followerCount: count
      }))
    );
  }

  private getUserWithStarredCount(user: User) {
    return this.countService.getCount(`${this.config.baseUrl}/users/${user.login}/starred`).pipe(
      map(count => ({
        ...user,
        starredCount: count
      }))
    );
  }

  private getUserWithAdditionalProps(user: User): Observable<User> {
    return this.getUserWithFollowerCount(user).pipe(
      switchMap(this.getUserWithStarredCount.bind(this))
    );
  }

  searchUsers(searchQuery: SearchQuery): Observable<SearchResult<User>> {
    return handleGitHubDataRequest<User, GitHubUserResponse>(
      this.config,
      this.http,
      GitHubCategory.Users,
      { ...searchQuery, type: GitHubCategory.Users },
      mapGitHubUserResponseToUser
    ).pipe(
      switchMap((userResult: SearchResult<User>) => {
        if (userResult.error) {
          return of(userResult);
        }
        return combineLatest<User[]>(
          userResult.items.map(this.getUserWithAdditionalProps.bind(this))
        ).pipe(
          map((users: User[]) => ({
            ...userResult,
            items: users
          }))
        );
      })
    );
  }
}

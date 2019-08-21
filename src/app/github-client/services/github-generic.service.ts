import { HttpClient, HttpResponse } from '@angular/common/http';
import { GitHubConfig } from '../config';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  SearchResult,
  SearchResultItem,
  GitHubSearchResponse,
  GitHubSearchItemResponse,
  GitHubCategory,
  SearchQuery
} from './model';
import { getPageInfo } from './github-count.service';

const categoryUrlMap = {
  [GitHubCategory.Repositories]: 'repositories',
  [GitHubCategory.Users]: 'users'
};

export function handleGitHubDataRequest<
  T extends SearchResultItem,
  R extends GitHubSearchItemResponse
>(
  config: GitHubConfig,
  http: HttpClient,
  type: GitHubCategory,
  query: SearchQuery,
  mappingCallback: (item: R) => T
): Observable<SearchResult<T>> {
  return http
    .get<GitHubSearchResponse>(`${config.baseUrl}/search/${categoryUrlMap[type]}`, {
      params: {
        q: query.query,
        type,
        per_page: config.page,
        page: query.page
      },
      observe: 'response'
    })
    .pipe(
      map((data: HttpResponse<GitHubSearchResponse>) => {
        // get search result from data body
        const item: SearchResult<T> = {
          totalCount: data.body.total_count,
          items: data.body.items.map(mappingCallback),
          query,
          pageInfo: { currentPage: query.page }
        };
        // parse page information from HttpHeader.Link
        const pageInfo = getPageInfo(data);
        if (pageInfo) {
          item.pageInfo.previousPage = pageInfo.previousPage;
          item.pageInfo.nextPage = pageInfo.nextPage;
          item.pageInfo.totalPage = pageInfo.totalPage;
        }
        return item;
      }),
      catchError((err: any) =>
        of({
          totalCount: 0,
          items: [],
          error: {
            originalError: err,
            message: `error when query GitHub ${err.message || 'unknown error!'}`
          },
          query
        })
      )
    );
}

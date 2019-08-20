import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GitHubSearchService } from '../services';
import { GitHubCategory, SearchResult, SearchQuery } from '@github-search/client/index';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap, map, scan, takeUntil, filter } from 'rxjs/operators';
import { RepositoryComponent } from '../repository/repository.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  categories: GitHubCategory[] = [GitHubCategory.Repositories, GitHubCategory.Users];

  searchResult$: Observable<SearchResult<any>>;
  research$ = new BehaviorSubject<Partial<SearchQuery>>(null);

  queryString$: Observable<string>;

  constructor(private githubSearchService: GitHubSearchService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryString$ = this.route.queryParams.pipe(
      tap(queryParams => {
        this.research$.next({
          query: queryParams.query,
          type: queryParams.type,
          page: queryParams.page
        });
      }),
      map(queryParams => queryParams.query)
    );

    this.searchResult$ = this.research$.pipe(
      filter(sq => !!sq),
      scan((sq: SearchQuery, sqChange: Partial<SearchQuery>) => ({ ...sq, ...sqChange })),
      switchMap((sq: SearchQuery) => this.githubSearchService.search(sq)),
      map(searchResult => ({
        ...searchResult,
        items: searchResult.items.map(item => ({
          ...item,
          component: item.type === GitHubCategory.Repositories ? RepositoryComponent : UserComponent
        }))
      })),
      tap(console.log)
    );
  }

  pageChanged(page: string) {
    this.research$.next({ page });
  }

  search(query: string) {
    this.research$.next({ query });
  }
}

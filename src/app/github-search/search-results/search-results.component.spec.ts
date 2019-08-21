import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { MockResultListComponent, MockSearchInputComponent } from '../testing/mock.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GitHubSearchService } from '../services';
import { of, BehaviorSubject } from 'rxjs';
import { GitHubCategory } from '../../github-client';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RepositoryComponent } from '../repository/repository.component';
import { expectElementContainText } from '../testing/component.test.util';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  const githubService = {
    search(sq: any) {
      if (!sq.query) {
        return of({
          type: GitHubCategory.Users,
          error: new Error('testError'),
          items: [],
          query: { type: (sq && sq.type) || GitHubCategory.Users }
        });
      }
      return of({
        totalCount: 10,
        items: [{ type: (sq && sq.type) || GitHubCategory.Users }],
        type: (sq && sq.type) || GitHubCategory.Users,
        query: { type: (sq && sq.type) || GitHubCategory.Users }
      });
    }
  };
  const activatedRoute = {
    queryParams: new BehaviorSubject({})
  };

  beforeEach(async(() => {
    spyOn(githubService, 'search').and.callThrough();
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, MockResultListComponent, MockSearchInputComponent],
      providers: [
        { provide: GitHubSearchService, useValue: githubService },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('route should trigger search', () => {
    const params = {
      query: 'testQuery',
      page: '1',
      type: GitHubCategory.Repositories
    };
    activatedRoute.queryParams.next(params);
    expect(githubService.search).toHaveBeenCalledWith(params);
  });

  it('page change should trigger search', () => {
    const params = {
      query: 'testQuery',
      page: '1',
      type: GitHubCategory.Repositories
    };
    activatedRoute.queryParams.next(params);
    expect(githubService.search).toHaveBeenCalledWith(params);
    const pageComp = fixture.debugElement.query(By.css('app-result-list')).componentInstance;
    pageComp.pageChanged.emit('3');
    expect(githubService.search).toHaveBeenCalledWith({ ...params, page: '3' });
  });

  it('search input should trigger search', () => {
    const params = {
      query: 'testQuery',
      page: '1',
      type: GitHubCategory.Repositories
    };
    activatedRoute.queryParams.next(params);
    expect(githubService.search).toHaveBeenCalledWith(params);
    const pageComp = fixture.debugElement.query(By.css('app-search-input')).componentInstance;
    pageComp.queryChanged.emit('newQuery');
    expect(githubService.search).toHaveBeenCalledWith({ ...params, query: 'newQuery' });
  });

  it('search result item should contain correct component', () => {
    const params = {
      query: 'testQuery',
      page: '1',
      type: GitHubCategory.Repositories
    };
    activatedRoute.queryParams.next(params);
    fixture.detectChanges();
    const pageComp = fixture.debugElement.query(By.css('app-result-list')).componentInstance;
    expect(pageComp.result.items[0].component).toEqual(RepositoryComponent);
  });

  it('search result should show correct content', () => {
    const params = {
      query: 'testQuery',
      page: '1',
      type: GitHubCategory.Repositories
    };
    activatedRoute.queryParams.next(params);
    fixture.detectChanges();
    expectElementContainText(fixture, '.result-title', `10 Repositories`);
  });

  it('search result should show error reason', () => {
    const params = {
      page: '1',
      type: GitHubCategory.Repositories
    };
    activatedRoute.queryParams.next(params);
    fixture.detectChanges();
    expectElementContainText(fixture, '.error', 'testError');
  });
});

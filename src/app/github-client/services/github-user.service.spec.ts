import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GitHubUserService } from './github-user.service';
import { GITHUB_BASE_URL_CONFIG } from '..';
import { GitHubPageService } from './github-count.service';
import { of, throwError } from 'rxjs';
import { GitHubCategory } from './model';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { buildLinks } from './testing/spec.util';

describe('GitHubUserService', () => {
  describe('GitHubUserService searchUsers', () => {
    let httpTestingController: HttpTestingController;
    let service: GitHubUserService;
    const baseUrl = 'http://test';
    const page = '1';
    const htmlUrl = 'https://github.com';
    let pageService;
    let followerResult;
    let starredResult;

    beforeEach(() => {
      pageService = {
        getCount: function(url: string) {
          if (url.indexOf('followers') !== -1) {
            return of(followerResult);
          }
          return of(starredResult);
        }
      };
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          GitHubUserService,
          {
            provide: GitHubPageService,
            useValue: pageService
          },
          {
            provide: GITHUB_BASE_URL_CONFIG,
            useValue: {
              baseUrl,
              page,
              htmlUrl
            }
          }
        ]
      });

      const injector = getTestBed();
      httpTestingController = injector.get(HttpTestingController);
      service = injector.get(GitHubUserService);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    const testDatas = [
      {
        searchQuery: {
          query: 'test',
          page: '2',
          type: GitHubCategory.Users
        },
        error: undefined,
        totalCount: 100,
        items: [
          {
            login: 'testUser',
            url: 'http://test',
            id: 1,
            avatar_url: 'http://avatar',
            followers_url: 'http://follower',
            html_url: 'http://html'
          }
        ],
        followerCount: 10,
        starredCount: 20,
        page: {
          prev: '1',
          next: '3',
          last: '20'
        },
        expectedResult: {
          mappedItems: [
            {
              login: 'testUser',
              url: 'http://test',
              id: 1,
              avatarUrl: 'http://avatar',
              githubUrl: 'http://html'
            }
          ]
        }
      },
      {
        searchQuery: {
          query: 'test',
          page: '2',
          type: GitHubCategory.Users
        },
        error: new Error('testError'),
        followerCount: 10,
        starredCount: 20,
        expectedResult: {
          mappedItems: [
            {
              login: 'testUser',
              url: 'http://test',
              id: 1,
              avatarUrl: 'http://avatar',
              githubUrl: 'http://html'
            }
          ]
        }
      },
      {
        searchQuery: {
          query: 'test',
          page: '2',
          type: GitHubCategory.Users
        },
        error: undefined,
        totalCount: 100,
        items: [
          {
            login: 'testUser',
            url: 'http://test',
            id: 1,
            avatar_url: 'http://avatar',
            followers_url: 'http://follower',
            html_url: 'http://html'
          }
        ],
        followerCount: 0,
        starredCount: 20,
        page: {
          prev: '1',
          next: '3',
          last: '20'
        },
        expectedResult: {
          mappedItems: [
            {
              login: 'testUser',
              url: 'http://test',
              id: 1,
              avatarUrl: 'http://avatar',
              githubUrl: 'http://html'
            }
          ]
        }
      }
    ];

    testDatas.forEach(testData => {
      it('searchUsers should return correct result', () => {
        followerResult = testData.followerCount;
        starredResult = testData.starredCount;

        service.searchUsers(testData.searchQuery).subscribe(searchResult => {
          if (searchResult.error) {
            expect(searchResult.error.originalError.error).toBe(testData.error);
          } else {
            expect(searchResult.totalCount).toBe(testData.totalCount);
            expect(searchResult.pageInfo).toEqual({
              currentPage: testData.searchQuery.page,
              previousPage: testData.page.prev,
              nextPage: testData.page.next,
              totalPage: testData.page.last
            });
            expect(searchResult.query).toEqual(testData.searchQuery);
            expect(searchResult.items.length).toBe(testData.items.length);
            for (let i = 0; i < searchResult.items.length; i++) {
              const exact = searchResult.items[i];
              const expected = testData.expectedResult.mappedItems[i];
              expect(exact.id).toBe(expected.id);
              expect(exact.avatarUrl).toBe(expected.avatarUrl);
              expect(exact.followerCount).toBe(
                typeof testData.followerCount === 'number' ? testData.followerCount : 0
              );
              expect(exact.starredCount).toBe(
                typeof testData.starredCount === 'number' ? testData.starredCount : 0
              );
              expect(exact.githubUrl).toBe(expected.githubUrl);
              expect(exact.login).toBe(expected.login);
            }
          }
        });
        const req = httpTestingController.expectOne((r: HttpRequest<any>) => {
          if (
            r.url === `${baseUrl}/search/users` &&
            r.params.get('q') === testData.searchQuery.query &&
            r.params.get('type') === testData.searchQuery.type &&
            r.params.get('per_page') === page &&
            r.params.get('page') === testData.searchQuery.page
          ) {
            return true;
          }
          return false;
        });

        let headers = new HttpHeaders();
        headers = headers.append('Link', buildLinks(testData.page));
        if (testData.error) {
          req.error(testData.error);
        } else {
          req.flush(
            {
              total_count: testData.totalCount,
              items: testData.items
            },
            { headers }
          );
        }
      });
    });
  });
});

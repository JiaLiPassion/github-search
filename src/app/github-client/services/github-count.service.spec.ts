import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { GitHubPageService, getPageInfo } from './github-count.service';
import { buildLinks } from './testing/spec.util';

describe('GitHubPageService', () => {
  describe('GitHubPageService getCount', () => {
    let httpTestingController: HttpTestingController;
    let service: GitHubPageService;
    const url = 'http://test';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [GitHubPageService]
      });

      const injector = getTestBed();
      httpTestingController = injector.get(HttpTestingController);
      service = injector.get(GitHubPageService);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    const testDatas: {
      pageInfo: { prev?: string; next?: string; last?: string };
      expectResult: number;
    }[] = [
      {
        pageInfo: {
          prev: '2',
          next: '4',
          last: '10'
        },
        expectResult: 10
      },
      {
        pageInfo: {
          last: '10'
        },
        expectResult: 10
      },
      {
        pageInfo: {
          prev: '10'
        },
        expectResult: 0
      },
      {
        pageInfo: {
          next: '10'
        },
        expectResult: 0
      },
      {
        pageInfo: null,
        expectResult: 0
      }
    ];

    testDatas.forEach(testData => {
      it('should be able to parse page info', () => {
        const pageInfo = testData.pageInfo;
        service.getCount(url).subscribe(count => {
          expect(count).toBe(testData.expectResult);
        });
        const req = httpTestingController.expectOne(`${url}?per_page=1`);

        expect(req.request.method).toEqual('GET');
        let headers = new HttpHeaders();
        headers = headers.append('Link', buildLinks(pageInfo));
        req.flush({}, { headers });
      });
    });
  });

  describe('getPageInfo', () => {
    let res = {
      headers: {
        get: function(key: string) {
          return this.testData;
        },
        set: function(testData: any) {
          this.testData = testData;
        }
      }
    };

    const testDatas: {
      pageInfo: { prev?: string; next?: string; last?: string };
    }[] = [
      {
        pageInfo: {
          prev: '2',
          next: '4',
          last: '10'
        }
      },
      {
        pageInfo: {
          last: '10'
        }
      },
      {
        pageInfo: {
          prev: '10'
        }
      },
      {
        pageInfo: {
          next: '10'
        }
      }
    ];
    testDatas.forEach(testData => {
      it('should be able to getPageInfo', () => {
        res.headers.set(buildLinks(testData.pageInfo));
        const pageInfo = getPageInfo(res as any);
        expect(pageInfo.previousPage).toEqual(testData.pageInfo.prev);
        expect(pageInfo.nextPage).toEqual(testData.pageInfo.next);
        expect(pageInfo.totalPage).toEqual(testData.pageInfo.last);
      });
    });
  });
});

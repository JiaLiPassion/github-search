import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as parseLinkHeader from 'parse-link-header';

export function getPageInfo(res: HttpResponse<any>) {
  const linkHeader = res.headers.get('Link');
  if (!linkHeader) {
    return null;
  }
  const parsed = parseLinkHeader(linkHeader);
  if (!parsed) {
    return null;
  }
  return {
    previousPage: parsed.prev && parsed.prev.page,
    nextPage: parsed.next && parsed.next.page,
    totalPage: parsed.last && parsed.last.page
  };
}

@Injectable({
  providedIn: 'root'
})
export class GitHubPageService {
  constructor(private http: HttpClient) {}

  getCount(url: string): Observable<number> {
    return this.http.get(url, { params: { per_page: '1' }, observe: 'response' }).pipe(
      map(res => {
        const linkHeader = res.headers.get('Link');
        if (!linkHeader) {
          return 0;
        }
        const parsed = parseLinkHeader(linkHeader);
        if (parsed && parsed.last && parsed.last.page) {
          const total = parseInt(parsed.last.page);
          if (typeof total === 'number') {
            return total;
          }
        }
        return 0;
      }),
      catchError(_ => of(0))
    );
  }
}

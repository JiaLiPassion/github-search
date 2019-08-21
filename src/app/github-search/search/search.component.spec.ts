import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { expectComponentExistence } from '../testing/component.test.util';
import { MockSearchInputComponent } from '../testing/mock.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { GitHubCategory } from '../../github-client';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let router: Router;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, MockSearchInputComponent],
      imports: [RouterTestingModule, FontAwesomeModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const routerSpy = spyOn(router, 'navigate');
    expect(component).toBeTruthy();
    const comp = expectComponentExistence(fixture, 'app-search-input');
    comp.queryChanged.emit('testQuery');
    expect(routerSpy).toHaveBeenCalledWith([`/result`], {
      queryParams: { query: 'testQuery', type: GitHubCategory.Users }
    });
  });
});

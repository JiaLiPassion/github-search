import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GITHUB_BASE_URL_CONFIG } from '../../github-client';
import { expectElementValue, clickButton } from '../testing/component.test.util';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  const config = {
    baseUrl: 'http://test',
    page: '2',
    homeUrl: 'http://home'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchInputComponent],
      providers: [
        {
          provide: GITHUB_BASE_URL_CONFIG,
          useFactory: () => config
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.queryString = 'testQuery';
    fixture.detectChanges();
    component.query.setValue('testQuery');
    component.perPage.setValue(config.page);
    expectElementValue(fixture, '.search-box-input', 'testQuery');
    expectElementValue(fixture, '.per-page-input', config.page);
    component.query.setValue('newQuery');
    component.perPage.setValue('3');
    component.queryChanged.subscribe(query => {
      expect(query).toEqual('newQuery');
    });
    fixture.detectChanges();
    clickButton(fixture, '.search-box-button');
    expect(config.page).toEqual('3');
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListComponent } from './result-list.component';
import { MockDynamicComponent, MockPagerComponent } from '../testing/mock.component';
import { GitHubCategory } from '../../github-client';
import { expectComponentInput, expectComponentNotExistence } from '../testing/component.test.util';
import { By } from '@angular/platform-browser';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultListComponent, MockDynamicComponent, MockPagerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testDatas = [
    {
      items: [
        {
          type: GitHubCategory.Users
        }
      ],
      pageInfo: {
        totalPage: '10'
      }
    },
    null
  ];

  testDatas.forEach(testData => {
    it('should show result list correctly', () => {
      component.result = testData as any;
      fixture.detectChanges();
      if (!testData) {
        expectComponentNotExistence(fixture, 'app-dynamic-item');
        expect(fixture.nativeElement.textContent).toContain(
          'No results match the search conditions.'
        );
      } else {
        expectComponentInput(fixture, 'app-dynamic-item', 'item', testData.items[0]);
        expectComponentInput(fixture, 'app-pager', 'pageInfo', testData.pageInfo);
        const pager = fixture.debugElement.query(By.css('app-pager'));
        const page = '1';
        component.pageChanged.subscribe(p => {
          expect(p).toBe(page);
        });
        pager.componentInstance.pageChanged.emit(page);
      }
    });
  });
});

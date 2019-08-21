import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerComponent } from './pager.component';
import { PageInfo } from '../../github-client';
import {
  expectElementContainText,
  expectElementIsDisabled,
  expectElementIsNotDisabled,
  clickButton
} from '../testing/component.test.util';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PagerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testDatas: PageInfo[] = [
    {
      previousPage: '1',
      currentPage: '2',
      nextPage: '3',
      totalPage: '100'
    },
    {
      currentPage: '1',
      nextPage: '2',
      totalPage: '100'
    },
    {
      previousPage: '99',
      currentPage: '100',
      totalPage: '100'
    }
  ];
  testDatas.forEach(testData => {
    it('pager component should show pageInfo correctly', () => {
      component.pageInfo = testData;
      fixture.detectChanges();
      if (!testData.previousPage) {
        expectElementIsDisabled(fixture, '.prev-button');
      } else {
        expectElementIsNotDisabled(fixture, '.prev-button');
      }
      if (!testData.nextPage) {
        expectElementIsDisabled(fixture, '.next-button');
      } else {
        expectElementIsNotDisabled(fixture, '.next-button');
      }
      expectElementContainText(fixture, '.current-page', testData.currentPage);
      expectElementContainText(fixture, '.total-page', testData.totalPage);
    });

    it('pager component prev button should emit event correctly', () => {
      component.pageInfo = testData;
      fixture.detectChanges();
      component.pageChanged.subscribe(page => {
        expect(page).toEqual(testData.previousPage);
      });
      clickButton(fixture, '.prev-button');
    });
    it('pager component next button should emit event correctly', () => {
      component.pageInfo = testData;
      fixture.detectChanges();
      component.pageChanged.subscribe(page => {
        expect(page).toEqual(testData.nextPage);
      });
      clickButton(fixture, '.next-button');
    });
  });
});

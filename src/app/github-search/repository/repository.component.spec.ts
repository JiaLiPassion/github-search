import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryComponent } from './repository.component';
import { Repository } from '../../github-client/services/repository';
import { GitHubCategory } from '../../github-client';

import { expectElementContainText, expectElementMatchUrl } from '../testing/component.test.util';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testDatas: Repository[] = [
    {
      name: 'testRepo',
      githubUrl: 'http://test/',
      type: GitHubCategory.Repositories,
      owner: {
        login: 'testUser',
        url: 'http://testuser/'
      },
      description: 'test desc'
    }
  ];

  testDatas.forEach(testData => {
    it('should display Repository data correctly', () => {
      component.item = testData;
      fixture.detectChanges();
      expectElementContainText(fixture, '.name', testData.name);
      expectElementContainText(fixture, '.description', testData.description);
      expectElementContainText(fixture, '.owner', testData.owner.login);
      expectElementMatchUrl(fixture, '.name > a', testData.githubUrl);
      expectElementMatchUrl(fixture, '.owner > a', testData.owner.url);
    });
  });
});

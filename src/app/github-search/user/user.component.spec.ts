import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { User, GitHubCategory } from '../../github-client';
import { expectElementMatchUrl, expectElementContainText } from '../testing/component.test.util';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testDatas: User[] = [
    {
      login: 'testRepo',
      githubUrl: 'http://test/',
      type: GitHubCategory.Users,
      avatarUrl: 'http://avatar',
      followerCount: 10,
      starredCount: 20
    }
  ];

  testDatas.forEach(testData => {
    it('should display User data correctly', () => {
      component.item = testData;
      fixture.detectChanges();
      expectElementContainText(fixture, '.handle', testData.login);
      expectElementContainText(fixture, '.star', testData.starredCount.toString());
      expectElementContainText(fixture, '.follower', testData.followerCount.toString());
      expectElementMatchUrl(fixture, '.avatar > a', testData.avatarUrl);
    });
  });
});

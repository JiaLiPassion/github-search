import { GitHubClientService } from './github-client.service';
import { GitHubCategory } from './model';

describe('github-client', () => {
  const userServiceSpy = jasmine.createSpyObj('userService', ['searchUsers']);
  const repoServiceSpy = jasmine.createSpyObj('repoService', ['searchRepositories']);
  const searchQuery = {
    query: 'test',
    type: GitHubCategory.Users
  };
  const githubClientService = new GitHubClientService(userServiceSpy as any, repoServiceSpy as any);

  it('searchUsers should call userService.searchUsers', () => {
    searchQuery.type = GitHubCategory.Users;
    githubClientService.searchUsers(searchQuery);
    expect(userServiceSpy.searchUsers).toHaveBeenCalledWith(searchQuery);
  });

  it('searchRepositories should call repoService.searchRepositories', () => {
    searchQuery.type = GitHubCategory.Repositories;
    githubClientService.searchRepositories(searchQuery);
    expect(repoServiceSpy.searchRepositories).toHaveBeenCalledWith(searchQuery);
  });
});

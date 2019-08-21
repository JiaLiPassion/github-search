import { GitHubSearchService } from './github-search.service';
import { GitHubCategory } from '../../github-client';

describe('GitHubSearchService', () => {
  const mockClient = {
    searchUsers: function() {},
    searchRepositories: function() {}
  };
  const service = new GitHubSearchService(mockClient as any);

  it('search type=Users should call githubClient.searchUsers', () => {
    spyOn(mockClient, 'searchUsers');
    const query = {
      query: 'testQuery',
      type: GitHubCategory.Users
    };
    service.search(query);
    expect(mockClient.searchUsers).toHaveBeenCalledWith(query);
  });

  it('search type=Repositories should call githubClient.searchRepositories', () => {
    spyOn(mockClient, 'searchRepositories');
    const query = {
      query: 'testQuery',
      type: GitHubCategory.Repositories
    };
    service.search(query);
    expect(mockClient.searchRepositories).toHaveBeenCalledWith(query);
  });

  it('search without query should return error', () => {
    spyOn(mockClient, 'searchRepositories');
    spyOn(mockClient, 'searchUsers');
    const query = {
      query: '',
      type: GitHubCategory.Repositories
    };
    service.search(query).subscribe(
      sr => {
        expect(sr.error.message).toContain('Query string can not be empty');
      },
      err => {
        fail('should not be here');
      }
    );
    expect(mockClient.searchRepositories).not.toHaveBeenCalled();
    expect(mockClient.searchUsers).not.toHaveBeenCalled();
  });
});

# Design

## Modules and Components
- github-client: Wrapper of http to handle request to GitHub Rest v3 API.
  - GitHubUserService: search users with additional requests to get `follower/starred` count.
  - GitHubRepositoryService: search repositories
  - GitHubPageService: 
    - parse pager information
    - get count (such as the count of user's follower/starred repo) using `per-page=1` request and get the page count mechanism. (follower count can be got from user profile request, but to keep the code consistent, I use the `per-page` method here).
  - handleGitHubDataRequest: common generic logic to handle pagination data request.
- github-search: the feature angular module
  - Router level components:
    - SearchComponent: the home page, will only navigate to `/result` page
    - SearchResultComponent: the result page.
      - the container component to handle the data request.
      - pass the requested data to children presenter component.
      - handle `search` stream with `scan/switchMap` operator
        - router queryParams will trigger search with `new query/page/type` parameters.
        - page change(prev/next) will trigger search with `new page` and existing `query/type` parameters.
        - search (top search bar) will trigger search with `new query/page` and existing `type` parameters.
  - Other components are basically presenter components to show data with `@Input()` and dispath simple `event` with `@Output()`
  - DynamicComponents
    - DynamicComponent: a `container component` as a place holder to hold `dynamic component` based on the search type(`Repository/User/Issue...`).
    - UserComponent: `User component` to display user data, can be injected into `dynamic component` placeholder 
    - RepositoryComponent: `Repository component` to display repository data, can be injected into `dynamic component` placeholder 

## Testing
  - Basically using `isolate test policy`, only test the logic for the layer itself, and `mock` the layer the test target depends, such as when test `SearchResultComponent`, will mock `GitHubSearchService`.

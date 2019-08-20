import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GithubSearchRoutingModule } from './github-search-routing.module';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { GithubClientModule } from '../github-client/github-client.module';
import { UserComponent } from './user/user.component';
import { RepositoryComponent } from './repository/repository.component';
import { DynamicItemComponent } from './dynamic-item/dynamic-item.component';
import { ResultListComponent } from './result-list/result-list.component';
import { PagerComponent } from './pager/pager.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent,
    UserComponent,
    RepositoryComponent,
    DynamicItemComponent,
    ResultListComponent,
    PagerComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    GithubSearchRoutingModule,
    FontAwesomeModule,
    GithubClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [UserComponent, RepositoryComponent]
})
export class GithubSearchModule {}

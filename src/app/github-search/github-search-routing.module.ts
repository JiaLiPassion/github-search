import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'result', component: SearchResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubSearchRoutingModule {}

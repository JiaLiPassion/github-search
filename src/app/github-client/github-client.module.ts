import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GITHUB_BASE_URL_CONFIG } from './config';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: GITHUB_BASE_URL_CONFIG,
      useValue: { baseUrl: 'https://api.github.com', page: '2', htmlUrl: 'https://github.com' }
    }
  ]
})
export class GithubClientModule {}

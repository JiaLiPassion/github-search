import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { GitHubCategory } from '../../github-client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;

  constructor(private router: Router) {}

  ngOnInit() {}

  search(query: string) {
    this.router.navigate(['/result'], { queryParams: { query, type: GitHubCategory.Users } });
  }
}

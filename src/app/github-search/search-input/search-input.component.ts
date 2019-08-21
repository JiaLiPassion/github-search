import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GITHUB_BASE_URL_CONFIG, GitHubConfig } from '../../github-client';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Input() queryString: string;
  @Output() queryChanged = new EventEmitter<string>();

  query = new FormControl('');
  perPage = new FormControl('');

  constructor(@Inject(GITHUB_BASE_URL_CONFIG) private config: GitHubConfig) {}

  ngOnInit() {
    if (this.queryString) {
      this.query.setValue(this.queryString);
    }
    if (this.config.page) {
      this.perPage.setValue(this.config.page);
    }
  }

  search(query: string) {
    this.config.page = this.perPage.value;
    this.queryChanged.emit(query);
  }
}

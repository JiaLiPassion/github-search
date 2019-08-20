import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchResult, SearchResultItem } from '@github-search/client/index';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  @Input() result: SearchResult<SearchResultItem>;
  @Output() pageChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  pageChangeHandler(page: string) {
    this.pageChanged.emit(page);
  }
}

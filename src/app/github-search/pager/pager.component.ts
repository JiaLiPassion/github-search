import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageInfo } from '@github-search/client/index';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() pageInfo: PageInfo;
  @Output() pageChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  prevClicked() {
    this.pageChanged.emit(this.pageInfo.previousPage);
  }
  nextClicked() {
    this.pageChanged.emit(this.pageInfo.nextPage);
  }
}

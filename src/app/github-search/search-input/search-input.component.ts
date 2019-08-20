import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Input() queryString: string;
  @Output() queryChanged = new EventEmitter<string>();

  query = new FormControl('');

  constructor() {}

  ngOnInit() {
    if (this.queryString) {
      this.query.setValue(this.queryString);
    }
  }

  search(query: string) {
    this.queryChanged.emit(query);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-item',
  template: ''
})
export class MockDynamicComponent {
  @Input() item: any;
}

@Component({
  selector: 'app-pager',
  template: ''
})
export class MockPagerComponent {
  @Input() pageInfo: any;
  @Output() pageChanged = new EventEmitter();
}

@Component({
  selector: 'app-search-input',
  template: ''
})
export class MockSearchInputComponent {
  @Input() queryString: string;
  @Output() queryChanged = new EventEmitter();
}

@Component({
  selector: 'app-result-list',
  template: ''
})
export class MockResultListComponent {
  @Input() result: any;
  @Output() pageChanged = new EventEmitter();
}

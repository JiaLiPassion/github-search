import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '@github-search/client/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() item: User;

  constructor() {}

  ngOnInit() {}

  gotoGitHub(url: string) {
    if (url) {
      window.location.href = url;
    }
  }
}

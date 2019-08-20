import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../../github-client/services/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  @Input() item: Repository;

  constructor() {}

  ngOnInit() {}
}

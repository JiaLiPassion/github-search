import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { SearchResultItem } from '../../github-client';

@Component({
  selector: 'app-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.css']
})
export class DynamicItemComponent implements OnInit {
  @Input() item: SearchResultItem;

  @ViewChild('containerRef', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    if (this.item && this.item.component) {
      const factory = this.resolver.resolveComponentFactory(this.item.component);
      const comp = this.container.createComponent(factory);
      (comp.instance as { item: SearchResultItem }).item = this.item;
    }
  }
}

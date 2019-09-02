import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LayoutService {

  constructor() { }
  ngOnInit() {
  }
  //Cross-comunications between components
  componentTitle = new Subject<string>();
  getComponentTitleListener() {
    return this.componentTitle.asObservable();
  }

  setComponentTitleListener(componentName: string) {
    return this.componentTitle.next(componentName);
  }
}


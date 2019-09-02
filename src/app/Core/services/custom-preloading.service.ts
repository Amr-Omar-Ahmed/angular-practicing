import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingService implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const loadRoute = (delay) => delay
      ? timer(3000).pipe(flatMap(() => load()))
      : load();
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }

  constructor() { }
}

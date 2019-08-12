import { Injectable } from '@angular/core';
import { ThyDragDirective } from './drag.directive';

@Injectable({ providedIn: 'root' })
export class ThyDragDropService<T = any> {
    public previousDrag: ThyDragDirective<T>;
    constructor() {}
}

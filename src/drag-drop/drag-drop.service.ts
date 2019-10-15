import { Injectable } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { ThyDropPosition } from './drag-drop.class';

@Injectable({ providedIn: 'root' })
export class ThyDragDropService<T = any> {
    public previousDrag: ThyDragDirective<T>;
    public dropPosition: ThyDropPosition;
    constructor() {}
}

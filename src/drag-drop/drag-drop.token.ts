import { EventEmitter, QueryList, InjectionToken, ElementRef } from '@angular/core';
import { ThyDragDropEvent, ThyDragStartEvent, ThyDragEndEvent, ThyDragOverEvent } from './drag-drop.class';
import { SafeAny } from 'ngx-tethys/types';

export interface IThyDragDirective<T = SafeAny> {
    data: T;
    container: IThyDropContainerDirective<T>;
}

export interface IThyDragHandleDirective {
    element: ElementRef<HTMLElement>;
    disabled: boolean;
}

export interface IThyDropContainerDirective<T = SafeAny> {
    started: EventEmitter<ThyDragStartEvent<T>>;

    ended: EventEmitter<ThyDragEndEvent<T>>;

    overed: EventEmitter<ThyDragOverEvent<T>>;

    dropped: EventEmitter<ThyDragDropEvent<T>>;

    beforeStart: (e: ThyDragStartEvent<T>) => boolean;

    beforeOver: (e: ThyDragOverEvent<T>) => boolean;

    beforeDrop: (e: ThyDragDropEvent<T>) => boolean;

    data: T[];

    disabled: boolean;

    draggables: QueryList<IThyDragDirective>;
}

export const THY_DROP_CONTAINER_DIRECTIVE = new InjectionToken<IThyDropContainerDirective>('THY_DROP_CONTAINER_DIRECTIVE');

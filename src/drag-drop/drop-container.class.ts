import { EventEmitter, QueryList, InjectionToken } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { ThyDragDropEvent, ThyDragStartEvent, ThyDragEndEvent, ThyDragOverEvent } from './drag-drop.class';

export interface IThyDropContainerDirective<T = any> {
    started: EventEmitter<ThyDragStartEvent<T>>;

    ended: EventEmitter<ThyDragEndEvent<T>>;

    overed: EventEmitter<ThyDragOverEvent<T>>;

    dropped: EventEmitter<ThyDragDropEvent<T>>;

    beforeStart: (e: ThyDragStartEvent<T>) => boolean;

    beforeOver: (e: ThyDragOverEvent<T>) => boolean;

    beforeDrop: (e: ThyDragDropEvent<T>) => boolean;

    data: T[];

    disabled: boolean;

    draggables: QueryList<ThyDragDirective>;
}

/**
 * Injection token used to provide the container directive to drag.
 */
export const THY_DROP_CONTAINER_DIRECTIVE = new InjectionToken<IThyDropContainerDirective>(
    'THY_DROP_CONTAINER_DIRECTIVE'
);

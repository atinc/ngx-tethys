import { EventEmitter, QueryList, InjectionToken, ElementRef, Signal, OutputEmitterRef } from '@angular/core';
import { ThyDragDropEvent, ThyDragStartEvent, ThyDragEndEvent, ThyDragOverEvent } from './drag-drop.class';
import { SafeAny } from 'ngx-tethys/types';

export interface IThyDragDirective<T = SafeAny> {
    data: Signal<T>;
    container: IThyDropContainerDirective<T>;
}

export interface IThyDragHandleDirective {
    element: ElementRef<HTMLElement>;
    disabled: Signal<boolean>;
}

export interface IThyDropContainerDirective<T = SafeAny> {
    started: OutputEmitterRef<ThyDragStartEvent<T>>;

    ended: OutputEmitterRef<ThyDragEndEvent<T>>;

    overed: OutputEmitterRef<ThyDragOverEvent<T>>;

    dropped: OutputEmitterRef<ThyDragDropEvent<T>>;

    beforeStart: Signal<(e: ThyDragStartEvent<T>) => boolean>;

    beforeOver: Signal<(e: ThyDragOverEvent<T>) => boolean>;

    beforeDrop: Signal<(e: ThyDragDropEvent<T>) => boolean>;

    data: Signal<T[]>;

    disabled: Signal<boolean>;

    draggables: Signal<readonly IThyDragDirective<any>[]>;
}

export const THY_DROP_CONTAINER_DIRECTIVE = new InjectionToken<IThyDropContainerDirective>('THY_DROP_CONTAINER_DIRECTIVE');

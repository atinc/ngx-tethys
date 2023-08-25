export enum ThyDropPosition {
    in = 'in',
    before = 'before',
    after = 'after'
}

export interface ThyDragStartEvent<T = any> {
    event?: Event;
    item?: T;
    containerItems?: T[];
    currentIndex: number;
}

export interface ThyDragEndEvent<T = any> {
    event?: DragEvent;
    item?: T;
    containerItems?: T[];
}

export interface ThyDragOverEvent<T = any> {
    event?: DragEvent;
    item?: T;
    containerItems?: T[];
    currentIndex: number;
    position?: ThyDropPosition;
    previousItem?: T;
    previousIndex?: number;
    previousContainerItems?: T[];
}

export interface ThyDragDropEvent<T = any> {
    event?: DragEvent;
    item?: T;
    containerItems?: T[];
    currentIndex: number;
    position?: ThyDropPosition;
    previousItem?: T;
    previousIndex?: number;
    previousContainerItems?: T[];
}

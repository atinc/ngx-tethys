export type ThyResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';

export interface ThyResizeEvent {
    width?: number;
    height?: number;
    col?: number;
    mouseEvent?: MouseEvent | TouchEvent;
}

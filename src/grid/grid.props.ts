import { EventEmitter, Input, Output } from '@angular/core';

export class GridProps {
    @Input() theme: string = 'default';
    @Input() data: any[] = [];
    @Input('row-name') rowName: string = 'row';
    @Input('class-name') className: string = '';
    @Input('max-height') maxHeight: string | number = '';
}
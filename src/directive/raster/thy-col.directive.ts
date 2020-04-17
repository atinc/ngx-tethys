import { Directive, HostBinding, Input, OnChanges, ElementRef } from '@angular/core';
import { UpdateHostClassService } from '../../shared';

export interface ThyColEmbeddedProperty {
    span?: number;
    pull?: number;
    push?: number;
    offset?: number;
    order?: number;
}

@Directive({
    selector: '[thyCol]',
    providers: [UpdateHostClassService],
    host: {
        class: 'thy-col'
    }
})
export class ThyColDirective implements OnChanges {
    @Input() thyFlex: string | number | null = null;
    @Input() thySpan: number | null = null;
    @Input() thyOrder: number | null = null;
    @Input() thyOffset: number | null = null;
    @Input() thyPush: number | null = null;
    @Input() thyPull: number | null = null;
    @Input() thyXs: number | ThyColEmbeddedProperty | null = null;
    @Input() thySm: number | ThyColEmbeddedProperty | null = null;
    @Input() thyMd: number | ThyColEmbeddedProperty | null = null;
    @Input() thyLg: number | ThyColEmbeddedProperty | null = null;
    @Input() thyXl: number | ThyColEmbeddedProperty | null = null;
    @Input() thyXXl: number | ThyColEmbeddedProperty | null = null;

    constructor(private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        this.updateHostClassService.updateClassByMap({
            [`thy-col-${this.thySpan}`]: true
        });
    }
}

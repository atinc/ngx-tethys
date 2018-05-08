import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[thyCol]'
})
export class ThyColDirective {

    @Input() thyCol: number;

    @Input() thySmCol: number;

    @Input() thyOffsetSm: number;

}

import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-card-content',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyCardContentComponent implements OnInit {

    @HostBinding('class.thy-card-content') thyCardContentClass = true;

    @HostBinding('class.thy-card-content--alignment-title') alignmentClass = false;

    @Input('thyAlign')
    set thyAlign(value: any) {
        this.alignmentClass = value === 'title';
    }

    @HostBinding('class.thy-card-content--scroll') scrollClassName = false;

    @Input('thyScroll')
    set thyScroll(value: any) {
        this.scrollClassName = inputValueToBoolean(value);
    }

    ngOnInit() {
    }
}

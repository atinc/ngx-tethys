import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

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
        this.scrollClassName = coerceBooleanProperty(value);
    }

    @HostBinding('class.thy-card-content--sm') _thySizeSm = false;

    @Input('thySize')
    set thySize(value: string) {
        this._thySizeSm = value === 'sm';
    }

    ngOnInit() {}
}

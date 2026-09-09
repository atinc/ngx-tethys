import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';

/**
 * @name thy-menu-divider,[thy-menu-divider],[thyMenuDivider]
 */
@Component({
    selector: 'thy-menu-divider,[thy-menu-divider],[thyMenuDivider]',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './menu-divider.component.html'
})
export class ThyMenuDivider implements OnInit {
    @HostBinding('class.thy-menu-divider') isThyMenuDivider = true;

    constructor() {}

    ngOnInit(): void {}
}

import { Component, Directive, ElementRef, Renderer2, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../../util/helpers';

@Directive({
    selector: '[thyIconNavLink]'
})
export class ThyIconNavLinkDirective {
    @HostBinding('class.active') navLinkActive = false;

    @HostBinding('class.thy-icon-nav-link') navLinkClass = true;

    @Input()
    set thyIconNavLinkActive(active: string) {
        this.navLinkActive = inputValueToBoolean(active);
    }
}

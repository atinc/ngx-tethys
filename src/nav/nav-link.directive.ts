import {
    Component,
    Directive,
    ElementRef,
    Renderer2,
    Input,
    HostBinding
} from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';


export type ThyNavLink = '' | 'active';

@Directive({
    selector: '[thyNavLink]',
})
export class ThyNavLinkDirective {

    @Input()
    set thyNavLinkActive(active: string) {
        this.navLinkActive = inputValueToBoolean(active);
    }

    @HostBinding('class.active') navLinkActive = false;

    @HostBinding('class.nav-link') navLinkClass = true;

    // @HostBinding('attr.href') navLinkHref = 'javascript:;';
}

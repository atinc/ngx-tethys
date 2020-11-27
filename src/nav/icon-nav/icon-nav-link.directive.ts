import { Component, Directive, ElementRef, Renderer2, Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

@Component({
    selector: '[thyIconNavLink]',
    template: '<ng-content></ng-content><thy-icon *ngIf="icon" [thyIconName]="icon"></thy-icon>'
})
export class ThyIconNavLinkComponent {
    @HostBinding('class.active') navLinkActive = false;

    @HostBinding('class.thy-icon-nav-link') navLinkClass = true;

    icon: string;

    @Input()
    set thyIconNavLinkIcon(icon: string) {
        this.icon = icon;
    }

    @Input()
    set thyIconNavLinkActive(active: string) {
        this.navLinkActive = coerceBooleanProperty(active);
    }
}

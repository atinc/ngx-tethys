import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-layout',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-layout'
    },
    standalone: true
})
export class ThyLayoutComponent {
    @HostBinding('class.thy-layout--has-sidebar') hasSidebar = false;
}

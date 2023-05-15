import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

/**
 * @name thy-sidebar-footer
 * @order 35
 */
@Component({
    selector: 'thy-sidebar-footer',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sidebar-footer'
    },
    standalone: true
})
export class ThySidebarFooterComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

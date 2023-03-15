import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-sidebar-footer',
    template: `
        <ng-content></ng-content>
    `,
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

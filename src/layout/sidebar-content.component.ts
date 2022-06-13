import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-sidebar-content',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sidebar-content'
    }
})
export class ThySidebarContentComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-sidebar-footer',
    template: `
        <ng-content></ng-content>
    `,
    host: {
        class: 'sidebar-footer'
    }
})
export class ThySidebarFooterComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

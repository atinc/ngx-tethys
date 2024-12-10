import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-popover-pass-data-content',
    template: `
        <thy-popover-header [thyTitle]="title"></thy-popover-header>
        <thy-popover-body>
            {{ content }}
        </thy-popover-body>
    `,
    standalone: false
})
export class ThyPopoverPassDataContentComponent implements OnInit {
    title: string;
    content: string;

    constructor() {}

    ngOnInit() {}
}

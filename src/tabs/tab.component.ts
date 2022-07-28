import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, TemplateRef } from '@angular/core';

/**
 * thy-tab
 */
@Component({
    selector: 'thy-tab',
    template: `
        <ng-template #content><ng-content></ng-content></ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyTabComponent implements OnInit {
    @ViewChild('content', { static: true }) content: TemplateRef<HTMLElement>;

    /**
     * 选项标题
     */
    @Input() thyTitle: string;

    constructor() {}

    ngOnInit(): void {
        debugger;
    }
}

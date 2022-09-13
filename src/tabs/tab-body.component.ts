import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[thy-tab-body], thy-tab-body',
    exportAs: 'thyTabBody',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngIf="active">
            <ng-template [ngTemplateOutlet]="content"></ng-template>
        </ng-container>
    `,
    host: {
        class: 'thy-tabs-tabpane',
        '[attr.aria-hidden]': '!active',
        '[attr.tabindex]': 'active ? 0 : -1',
        '[style.visibility]': 'tabPaneAnimated ? active ? null : "hidden" : null',
        '[style.height]': 'tabPaneAnimated ? active ? null : 0 : null',
        '[style.overflow-y]': 'tabPaneAnimated ? active ? null : "none" : null',
        '[style.display]': '!tabPaneAnimated ? active ? null : "none" : null'
    }
})
export class ThyTabBodyComponent {
    @Input() content: TemplateRef<void> | null = null;
    @Input() active = false;
    @Input() tabPaneAnimated = true;
}

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'thy-tab-content, [thyTabContent]',
    exportAs: 'thyTabContent',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngIf="active">
            <ng-template [ngTemplateOutlet]="content"></ng-template>
        </ng-container>
    `,
    host: {
        class: 'thy-tab-content',
        '[attr.aria-hidden]': '!active',
        '[attr.tabindex]': 'active ? 0 : -1',
        '[style.visibility]': 'tabPaneAnimated ? active ? null : "hidden" : null',
        '[style.height]': 'tabPaneAnimated ? active ? null : 0 : null',
        '[style.overflow-y]': 'tabPaneAnimated ? active ? null : "none" : null',
        '[style.display]': '!tabPaneAnimated ? active ? null : "none" : null'
    }
})
export class ThyTabContentComponent {
    @Input() content: TemplateRef<void> | null = null;

    @Input() active = false;

    @Input() tabPaneAnimated = true;
}

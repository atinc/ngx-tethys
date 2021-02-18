import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

export type ThyDividerStyle = 'solid' | 'dashed';

export type ThyDividerTextDirection = 'left' | 'right' | 'center';

@Component({
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider',
    template: `
        <div *ngIf="templateContent" class="thy-divider-inner-template">
            <ng-template *ngTemplateOutlet="templateContent"></ng-template>
        </div>

        <span *ngIf="textContent" class="thy-divider-inner-text">{{ textContent }}</span>
    `,
    host: {
        '[class.thy-divider]': `true`,
        '[class.thy-divider-horizontal]': `!thyVertical`,
        '[class.thy-divider-vertical]': `thyVertical`,
        '[class.thy-divider-with-content]': `textContent || templateContent`,
        '[class.thy-divider-with-content-left]': `(textContent || templateContent) && thyTextDirection === 'left'`,
        '[class.thy-divider-with-content-right]': `(textContent || templateContent) && thyTextDirection === 'right'`,
        '[class.thy-divider-with-content-center]': `(textContent || templateContent) && thyTextDirection === 'center'`,
        '[class.thy-divider-solid]': `thyStyle === 'solid'`,
        '[class.thy-divider-dashed]': `thyStyle === 'dashed'`
    }
})
export class ThyDividerComponent {
    templateContent: TemplateRef<HTMLElement>;

    textContent: string;

    @Input() set thyText(value: string | TemplateRef<HTMLElement>) {
        if (value instanceof TemplateRef) {
            this.templateContent = value;
        } else {
            this.textContent = value;
        }
    }

    @Input() thyVertical: boolean;

    @Input() thyStyle: ThyDividerStyle = 'solid';

    @Input() thyTextDirection: ThyDividerTextDirection = 'center';

    constructor() {}
}

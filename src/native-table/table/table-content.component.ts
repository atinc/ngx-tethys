import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

import { ThyNativeTableLayout } from '../table.interface';

@Component({
    selector: 'table[thy-native-table-content]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (listOfColWidth().length > 0) {
            <colgroup>
                @for (width of listOfColWidth(); track $index) {
                    <col [style.width]="width" [style.minWidth]="width" />
                }
            </colgroup>
        }
        @if (theadTemplate()) {
            <thead class="thy-native-table-thead">
                <ng-template [ngTemplateOutlet]="theadTemplate()!"></ng-template>
            </thead>
        }
        @if (contentTemplate()) {
            <ng-template [ngTemplateOutlet]="contentTemplate()!"></ng-template>
        }
        <ng-content></ng-content>
        @if (tfootTemplate()) {
            <tfoot class="thy-native-table-summary">
                <ng-template [ngTemplateOutlet]="tfootTemplate()!"></ng-template>
            </tfoot>
        }
    `,
    host: {
        '[style.table-layout]': 'tableLayout()',
        '[style.width]': 'scrollX()',
        '[style.min-width]': `scrollX() ? '100%' : null`
    },
    imports: [NgTemplateOutlet]
})
export class ThyNativeTableContentComponent {
    readonly tableLayout = input<ThyNativeTableLayout>('auto');

    readonly theadTemplate = input<TemplateRef<SafeAny> | null>(null);

    readonly contentTemplate = input<TemplateRef<SafeAny> | null>(null);

    readonly tfootTemplate = input<TemplateRef<SafeAny> | null>(null);

    readonly listOfColWidth = input<ReadonlyArray<string | null>>([]);

    readonly scrollX = input<string | null>(null);
}

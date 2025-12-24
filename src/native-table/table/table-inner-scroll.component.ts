import { ChangeDetectionStrategy, Component, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

import { ThyNativeTableContentComponent } from './table-content.component';

@Component({
    selector: 'thy-native-table-inner-scroll',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (scrollY()) {
            <div #tableHeaderElement class="thy-native-table-header">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [theadTemplate]="theadTemplate()"></table>
            </div>
            <div #tableBodyElement class="thy-native-table-body" [style.max-height]="scrollY()">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [contentTemplate]="contentTemplate()"></table>
            </div>
            <div #tableFootElement class="thy-native-table-summary">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [tfootTemplate]="tfootTemplate()"></table>
            </div>
        } @else {
            <div class="thy-native-table-content" [style.overflow-x]="scrollX() ? 'auto' : null">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [theadTemplate]="theadTemplate()"
                    [contentTemplate]="contentTemplate()"
                    [tfootTemplate]="tfootTemplate()"></table>
            </div>
        }
    `,
    host: { class: 'thy-native-table-container' },
    imports: [ThyNativeTableContentComponent]
})
export class ThyNativeTableInnerScrollComponent<T = SafeAny> {
    readonly data = input<readonly T[]>([]);
    readonly scrollX = input<string | null>(null);
    readonly scrollY = input<string | null>(null);
    readonly contentTemplate = input<TemplateRef<SafeAny> | null>(null);
    readonly widthConfig = input<string[]>([]);
    readonly listOfColWidth = input<ReadonlyArray<string | null>>([]);
    readonly theadTemplate = input<TemplateRef<SafeAny> | null>(null);
    readonly tfootTemplate = input<TemplateRef<SafeAny> | null>(null);
}

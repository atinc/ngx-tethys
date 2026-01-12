import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject } from '@angular/core';

import { ThyNativeTableStyleService } from '../services/table-style.service';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyNativeTableTrMeasureComponent } from '../row/tr-measure.component';

/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'tbody',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (listOfMeasureColumnKeys(); as listOfMeasureColumnKeys) {
            @if (isInsideNativeTable && listOfMeasureColumnKeys.length) {
                <tr
                    thy-native-table-measure-row
                    [listOfMeasureColumnsKey]="listOfMeasureColumnKeys"
                    (listOfMeasureWidthChange)="onListOfMeasureWidthChange($event)"></tr>
            }
        }
        <ng-content></ng-content>
        @if (showEmpty()) {
            <tr class="thy-table-empty">
                <td colspan="100%">
                    <thy-empty
                        [thyMessage]="emptyOptions()?.message"
                        [thyIconName]="emptyOptions()?.iconName"
                        [thySize]="emptyOptions()?.size"
                        [thyMarginTop]="emptyOptions()?.marginTop"
                        [thyTopAuto]="emptyOptions()?.topAuto"></thy-empty>
                </td>
            </tr>
        }
    `,
    host: {
        '[class.thy-native-table-tbody]': 'isInsideNativeTable'
    },
    imports: [ThyEmpty, ThyNativeTableTrMeasureComponent]
})
export class ThyNativeTableBodyComponent {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });
    public isInsideNativeTable = !!this.styleService;

    public showEmpty = computed(() => this.styleService?.showEmpty() ?? false);
    public emptyOptions = computed(() => this.styleService?.emptyOptions() ?? null);
    public listOfMeasureColumnKeys = computed(() => this.styleService?.listOfAutoMeasureColumnKeys() ?? []);

    constructor() {}

    onListOfMeasureWidthChange(event: any) {
        this.styleService?.setListOfMeasureWidth(event);
    }
}

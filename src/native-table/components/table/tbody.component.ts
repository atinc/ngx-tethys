import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

import { ThyNativeTableStyleService } from '../../services/table-style.service';
import { ThyNativeTableTrMeasureComponent } from '../row/tr-measure.component';

@Component({
    selector: 'tbody',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (listOfMeasureColumn$ | async; as listOfMeasureColumn) {
            @if (isInsideNativeTable && listOfMeasureColumn.length) {
                <tr
                    thyNativeTableMeasureRow
                    [listOfMeasureColumn]="listOfMeasureColumn"
                    (listOfAutoWidth)="onListOfAutoWidthChange($event)"></tr>
            }
        }
        <ng-content></ng-content>
    `,
    host: {
        '[class.thy-native-table-tbody]': 'isInsideNativeTable'
    },
    imports: [AsyncPipe, ThyNativeTableTrMeasureComponent]
})
export class ThyNativeTableBodyComponent {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });

    isInsideNativeTable = !!this.styleService;

    listOfMeasureColumn$ = new BehaviorSubject<readonly string[]>([]);

    constructor() {
        if (this.styleService) {
            const { listOfMeasureColumn$ } = this.styleService;
            listOfMeasureColumn$.pipe(takeUntilDestroyed()).subscribe(this.listOfMeasureColumn$);
        }
    }

    onListOfAutoWidthChange(listOfAutoWidth: number[]): void {
        this.styleService?.setListOfAutoWidth(listOfAutoWidth);
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'tr[thy-table-measure-row]',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @for (key of listOfMeasureColumn; track key) {
            <td>
                <div style="width: 1px; height: 0px; overflow: hidden;">
                    <ng-content></ng-content>
                </div>
            </td>
        }
    `
})
export class ThyNativeTableTrMeasureComponent {
    @Input() listOfMeasureColumn: readonly string[] = [];
    @Output() readonly listOfAutoWidth = new EventEmitter<number[]>();
}

import {
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    input,
    output,
    OnInit,
    DestroyRef
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'td[thyShowExpand], td[thyExpand]',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (thyShowExpand()) {
            @if (thyExpandIcon()) {
                <ng-template [ngTemplateOutlet]="thyExpandIcon()!"></ng-template>
            } @else {
                <div
                    class="thy-native-table-row-expand-icon"
                    [class.thy-native-table-row-expand-icon-expanded]="thyExpand()"
                    [class.thy-native-table-row-expand-icon-collapsed]="!thyExpand()"
                    (click)="onExpandChange(!thyExpand())">
                    <thy-icon thyIconName="angle-down"></thy-icon>
                </div>
            }
        }
        <ng-content></ng-content>
    `,
    host: {
        '[class.thy-native-table-cell-with-append]': 'thyShowExpand()'
    },
    imports: [NgTemplateOutlet, ThyIcon]
})
export class ThyNativeTableTdExpandComponent<T> implements OnInit {
    readonly thyRowData = input<T | null>(null);

    readonly thyShowExpand = input(false, { transform: booleanAttribute });
    readonly thyExpand = input(false, { transform: booleanAttribute });
    readonly thyExpandIcon = input<TemplateRef<void> | null>(null);

    readonly thyExpandChange = output<boolean>();

    ngOnInit(): void {}

    onExpandChange(expand: boolean): void {
        this.thyExpandChange.emit(expand);
    }
}

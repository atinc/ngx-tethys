import { ChangeDetectionStrategy, Component, TemplateRef, booleanAttribute, input, output, OnInit, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ThyIcon } from 'ngx-tethys/icon';
import { ThyNativeTableSortOrder } from '../table.interface';

/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'th[thySortable]',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-content></ng-content>
        <span class="thy-native-table-column-sorter" [class.thy-native-table-column-sorter-full]="isDown() && isUp()">
            <span class="thy-native-table-column-sorter-inner">
                @if (sortTriggerTemplate()) {
                    <ng-template [ngTemplateOutlet]="sortTriggerTemplate()!"></ng-template>
                } @else {
                    @if (isUp()) {
                        <thy-icon
                            thyIconName="angle-up"
                            class="thy-native-table-column-sorter-up"
                            [class.active]="currentSortOrder() === 'asc'" />
                    }
                    @if (isDown()) {
                        <thy-icon
                            thyIconName="angle-down"
                            class="thy-native-table-column-sorter-down"
                            [class.active]="currentSortOrder() === 'desc'" />
                    }
                }
            </span>
        </span>
    `,
    host: {
        '[class.thy-native-table-column-has-sorters]': 'thySortable()',
        '[class.thy-native-table-column-sort]': 'currentSortOrder() === "desc" || currentSortOrder() === "asc"'
    },
    imports: [NgTemplateOutlet, ThyIcon]
})
export class ThyNativeTableThSortComponent implements OnInit {
    readonly thySortable = input(false, { transform: booleanAttribute });

    readonly thySortOrder = input<ThyNativeTableSortOrder | null>(null);

    readonly thySortDirections = input<ThyNativeTableSortOrder[]>(['asc', 'desc', null]);

    readonly sortTriggerTemplate = input<TemplateRef<any> | null>(null);

    readonly thySortOrderChange = output<string | null>();

    currentSortOrder = signal<ThyNativeTableSortOrder | null>(null);

    isUp = computed(() => {
        const directions = this.thySortDirections();
        return directions.indexOf('asc') !== -1;
    });

    isDown = computed(() => {
        const directions = this.thySortDirections();
        return directions.indexOf('desc') !== -1;
    });

    setSortOrder(order: ThyNativeTableSortOrder): void {
        this.currentSortOrder.set(order);
    }

    ngOnInit(): void {
        if (this.thySortOrder() !== null) {
            this.currentSortOrder.set(this.thySortOrder()!);
        }
    }
}

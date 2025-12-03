import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    input,
    output,
    OnInit,
    DestroyRef,
    signal,
    computed
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';

import { ThyIcon } from 'ngx-tethys/icon';
import { ThyNativeTableSortOrder } from '../../table.interface';

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
    private destroyRef = inject(DestroyRef);

    private sortOrderChange$ = new Subject<ThyNativeTableSortOrder>();

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
        this.sortOrderChange$.next(order);
    }

    clearSortOrder(): void {
        if (this.currentSortOrder() !== null) {
            this.setSortOrder(null);
        }
    }

    ngOnInit(): void {
        if (this.thySortOrder() !== null) {
            this.currentSortOrder.set(this.thySortOrder()!);
        }

        this.sortOrderChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(order => {
            if (this.currentSortOrder() !== order) {
                this.currentSortOrder.set(order);
                this.thySortOrderChange.emit(order);
            }
        });
    }
}

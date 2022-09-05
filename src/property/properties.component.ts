import { InputNumber } from 'ngx-tethys/core';
import { merge, Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    SimpleChanges,
    ViewChildren
} from '@angular/core';

import { ThyPropertyItemComponent } from './property-item.component';

/**
 * 属性列表组件
 * @name thy-properties
 */
@Component({
    selector: 'thy-properties',
    templateUrl: './properties.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-properties',
        '[class.thy-properties-vertical]': 'thyLayout === "vertical"',
        '[class.thy-properties-horizontal]': 'thyLayout === "horizontal"',
        '[class.thy-properties-edit-trigger-hover]': 'thyEditTrigger === "hover"'
    }
})
export class ThyPropertiesComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges, OnDestroy {
    /**
     * 展示布局
     * @type "horizontal" | "vertical"
     * @default horizontal
     */
    @Input() thyLayout: 'horizontal' | 'vertical' = 'horizontal';

    /**
     * 设置一行的可以 property-item 的数量
     * @type  number
     * @default 1
     */
    @Input() @InputNumber() thyColumn: number = 1;

    /**
     * 设置编辑状态触发方法
     * @type 'hover' | 'click'
     * @default hover
     */
    @Input() thyEditTrigger: 'hover' | 'click' = 'hover';

    /**
     * @private
     */
    @ContentChildren(ThyPropertyItemComponent) items!: QueryList<ThyPropertyItemComponent>;

    /**
     * @private
     */
    @ViewChildren('item', { read: ElementRef }) itemElements: QueryList<ElementRef<HTMLElement>>;

    rows: ThyPropertyItemComponent[][] = [];

    private destroy$ = new Subject();

    private editTrigger$ = new Subject();

    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    ngAfterContentInit(): void {
        this.items.changes.pipe(startWith(this.items), takeUntil(this.destroy$)).subscribe(() => {
            this.splitItems();
            this.cdr.markForCheck();
        });

        merge(...this.items.map(item => item.changes$))
            .pipe(
                filter(changes => changes.thySpan && !changes.thySpan.firstChange),
                takeUntil(merge(this.items.changes, this.destroy$))
            )
            .subscribe(() => {
                this.splitItems();
                this.cdr.markForCheck();
            });
    }

    ngAfterViewInit(): void {
        this.itemElements.changes.pipe(startWith(this.itemElements), takeUntil(this.destroy$)).subscribe(event => {
            this.bindTriggerEvent();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyEditTrigger && !changes.thyEditTrigger.firstChange) {
            this.editTrigger$.next();
            this.bindTriggerEvent();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private splitItems(): void {
        const items = this.items.toArray();
        const rows: ThyPropertyItemComponent[][] = [[]];
        items.forEach(item => {
            const lastRowItems = rows[rows.length - 1];
            const totalSpan = lastRowItems.reduce((result, item) => result + item.thySpan, 0);
            // 计算最后一行剩余 span 空间是否容纳下当前 item 的 span，如果容纳不下则新增一行
            if (item.thySpan <= this.thyColumn - totalSpan) {
                lastRowItems.push(item);
            } else {
                rows.push([item]);
            }
        });
        this.rows = rows;
    }

    private bindTriggerEvent() {
        this.ngZone.runOutsideAngular(() => {
            const eventDestroy$ = merge(this.itemElements.changes, this.editTrigger$, this.destroy$);

            this.itemElements.forEach((element, index) => {
                const itemComponent = this.items.get(index);
                if (itemComponent.thyEditable) {
                    return itemComponent
                        .editorClick(element.nativeElement)
                        .pipe(takeUntil(eventDestroy$))
                        .subscribe();
                }
            });
        });
    }
}

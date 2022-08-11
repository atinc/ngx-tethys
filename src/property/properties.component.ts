import {
    Component,
    ContentChildren,
    Input,
    OnInit,
    QueryList,
    AfterContentInit,
    ChangeDetectionStrategy,
    OnDestroy,
    ElementRef,
    NgZone,
    ChangeDetectorRef
} from '@angular/core';
import { InputNumber } from 'ngx-tethys/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';
import { ThyPropertyItemComponent } from './property-item.component';

const itemContentEditableClass = 'thy-properties-item-content-editable';
const itemContentEditingClass = 'thy-properties-item-content-editing';

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
        '[class.thy-properties-horizontal]': 'thyLayout === "horizontal"'
    }
})
export class ThyPropertiesComponent implements OnInit, AfterContentInit, OnDestroy {
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

    rows: ThyPropertyItemComponent[][] = [];

    private destroy$ = new Subject();

    constructor(private elementRef: ElementRef<HTMLElement>, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.bindTriggerEvent();
    }

    ngAfterContentInit(): void {
        this.items.changes.pipe(startWith(this.items), takeUntil(this.destroy$)).subscribe(() => {
            this.splitItems();
            this.cdr.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    cancelEditing() {
        const editingElements = this.elementRef.nativeElement.querySelectorAll(`.${itemContentEditingClass}`);
        editingElements.forEach(element => {
            element.classList.remove(itemContentEditingClass);
        });
    }

    private splitItems(): void {
        const items = this.items.toArray();
        const rows = [];
        for (let i = 0; i < this.items.length; i += this.thyColumn) {
            const rowItems = items.slice(i, i + this.thyColumn);
            if (rowItems.length < this.thyColumn) {
                const fillCount = this.thyColumn - rowItems.length;
                for (let j = 0; j < fillCount; j++) {
                    rowItems.push(null);
                }
            }
            rows.push(rowItems);
        }
        this.rows = rows;
    }

    private getEditContentElement(target: HTMLElement) {
        return target.classList.contains(`.${itemContentEditableClass}`) ? target : target.closest(`.${itemContentEditableClass}`);
    }

    private bindTriggerEvent() {
        this.ngZone.runOutsideAngular(() => {
            if (this.thyEditTrigger === 'hover') {
                fromEvent(this.elementRef.nativeElement, 'mouseover')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(event => {
                        const editContentElement = this.getEditContentElement(event.target as HTMLElement);
                        if (editContentElement) {
                            editContentElement.classList.add(itemContentEditingClass);
                        }
                    });
                fromEvent(this.elementRef.nativeElement, 'mouseout')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(event => {
                        const editContentElement = this.getEditContentElement(event.target as HTMLElement);
                        if (editContentElement) {
                            editContentElement.classList.remove(itemContentEditingClass);
                        }
                    });
            } else {
                fromEvent(this.elementRef.nativeElement, 'click')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(event => {
                        const editContentElement = this.getEditContentElement(event.target as HTMLElement);
                        if (editContentElement) {
                            editContentElement.classList.add(itemContentEditingClass);
                        }
                    });
            }
        });
    }
}

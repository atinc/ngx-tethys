import { ChangeDetectorRef, ElementRef, Injectable, NgZone, Renderer2 } from '@angular/core';
import { EMPTY, fromEvent, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyTableColumn } from './table.interface';

const css = {
    tableBody: 'thy-table-body',
    tableScrollLeft: 'thy-table-scroll-left',
    tableScrollRight: 'thy-table-scroll-right',
    tableScrollMiddle: 'thy-table-scroll-middle'
};

@Injectable()
export class TableDomService {
    element: HTMLElement;

    private ngUnsubscribe$ = new Subject();

    private scrollClassName: string;

    private get tableScrollElement(): HTMLElement {
        return this.element.getElementsByClassName(css.tableBody)[0] as HTMLElement;
    }

    private get scroll$() {
        return merge<MouseEvent>(this.tableScrollElement ? fromEvent<MouseEvent>(this.tableScrollElement, 'wheel') : EMPTY);
    }

    constructor(private ngZone: NgZone, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

    initialize(elementRef: ElementRef<HTMLElement>) {
        this.element = elementRef.nativeElement;

        this.ngZone.runOutsideAngular(() => {
            this.bindScrollEvent();
        });
    }

    bindScrollEvent() {
        this.scroll$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: WheelEvent) => {
            this.updateScrollClass();
        });
    }

    private updateScrollClass() {
        const scrollElement = this.tableScrollElement;
        const maxScrollLeft = scrollElement.scrollWidth - scrollElement.offsetWidth;
        const scrollX = scrollElement.scrollLeft;
        const lastScrollClassName = this.scrollClassName;
        this.scrollClassName = '';
        if (scrollElement.scrollWidth > scrollElement.clientWidth) {
            if (scrollX >= maxScrollLeft) {
                this.scrollClassName = css.tableScrollRight;
            } else if (scrollX === 0) {
                this.scrollClassName = css.tableScrollLeft;
            } else {
                this.scrollClassName = css.tableScrollMiddle;
            }
        }
        if (lastScrollClassName) {
            this.renderer.removeClass(this.tableScrollElement, lastScrollClassName);
        }
        if (this.scrollClassName) {
            this.renderer.addClass(this.tableScrollElement, this.scrollClassName);
        }
    }

    public updateColumnsFixedPosition(columns: ThyTableColumn[]) {
        const leftColumns: ThyTableColumn[] = [];
        const rightColumns: ThyTableColumn[] = [];
        const freeColumns: ThyTableColumn[] = [];

        columns.forEach(column => {
            if (column.fixedLeft) {
                leftColumns.push(column);
            } else if (column.fixedRight) {
                rightColumns.push(column);
            } else {
                freeColumns.push(column);
            }
        });

        // 计算左侧固定列
        let leftIncrease = 0;
        leftColumns.forEach(column => {
            column.left = leftIncrease;
            leftIncrease = leftIncrease + parseInt((column.width as string).split('px')[0], 10);
        });
        // 计算右侧固定列
        let rightIncrease = 0;
        rightColumns.reverse().forEach(column => {
            column.right = rightIncrease;
            rightIncrease = rightIncrease + parseInt((column.width as string).split('px')[0], 10);
        });
        // 清除非固定列距离左侧、右侧的值
        freeColumns.forEach(column => {
            column.left = null;
            column.right = null;
        });

        return columns;
    }
}

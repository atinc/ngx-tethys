import {
    Component,
    Input,  
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'thy-pagination-pager',
    templateUrl: './pagination-pager.component.html'
})
export class ThyPaginationPagerComponent implements OnInit, OnChanges {

    @Input() current: number;

    @Input() count: number;

    @Input() reservedNum: number;

    @Input() pagerSize: number;

    @Output() clickPage: EventEmitter<number> = new EventEmitter<number>();

    private pagers: number[];
    private showPrevMore: Boolean = false;
    private showNextMore: Boolean = false;

    constructor() {}

    pagerGenerator(minValue: number, all: number = 0): number[] {
        const pagerSize = all ? all : this.pagerSize;
        const target: number[] = new Array(pagerSize)
            .fill('')
            .map((v, i) => i + minValue);
        return target;
    }

    makePagers(current: number, count: number): number[] {
        const pagerCount: number = this.pagerSize + this.reservedNum * 2;
        if (count <= pagerCount) {
            this.setMoreBtn(false, false);
            const target: number[] = this.pagerGenerator(2, count);
            target.length = count - 2 >= 0 ? count - 2 : 0;
            return target;
        }

        const half: number = (this.pagerSize - 1) / 2;
        const max: number = count - this.reservedNum - 1;
        const min: number = this.reservedNum + 2;

        if (current + half >= max) {
            this.setMoreBtn(true, false);
            return this.pagerGenerator(count - this.pagerSize);
        }
        if (current - half <= min) {
            this.setMoreBtn(false, true);
            return this.pagerGenerator(2);
        }

        this.setMoreBtn(true, true);
        return this.pagerGenerator(current - half);
    }

    setMoreBtn(prev: boolean, next: boolean): void {
        this.showPrevMore = prev;
        this.showNextMore = next;
    }

    clickHandle(to: number): void {
        const step: number = to - this.current;
        this.clickPage.emit(step);
    }

    jumpHandle(step: number): void {
        this.clickPage.emit(step);
    }

    ngOnInit(): void {
        this.pagers = this.makePagers(this.current, this.count);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes) {
            return;
        }
        this.pagers = this.makePagers(this.current, this.count);
    }
}

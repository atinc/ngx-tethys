import { Component, Input, HostBinding, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'thy-pagination-jump',
    templateUrl: './pagination-jump.component.html',
})
export class ThyPaginationJumpComponent  {

    @Input() page: number;
    @Input() max: number;
    @Output() next: EventEmitter<number> = new EventEmitter<number>();
    @Input() disabled: boolean;
    @HostBinding('class.thy-pagination-jump') _paginationJump = true;

    constructor() { }

    static nextPageNumber(page: number, max: number): number {

        if (page <= 1) {
            return 1;
        }
        if (page >= max) {
            return max;
        }
        return page;
    }

    changeHandle(nextValue: number): void {
        if (Number.isNaN(+ nextValue)) {
            return;
        }
        const next: number = ThyPaginationJumpComponent.nextPageNumber(+ nextValue, this.max);
        const pre: number = this.page;
        this.page = Math.round(next);
        this.next.emit(this.page - pre);
    }

}

import { Component, Input, HostBinding, OnInit, Output, EventEmitter, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { ConfigModel } from './models';

export interface PageChangedEvent {
    itemsPerPage: number;
    page: number;
}

export const PAGINATION_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef(() => ThyPaginationComponent),
    multi: true
};

@Component({
    selector: 'thy-pagination',
    templateUrl: './pagination.component.html',
    providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
})
export class ThyPaginationComponent implements ControlValueAccessor, OnInit {


    /** === 以下选项 为兼容 ngx-bootstrap 用； === */
    @Input() align: boolean;
    @Input() maxSize: number;
    @Input() boundaryLinks: boolean;
    @Input() directionLinks: boolean;
    @Input() firstText: string;
    @Input() previousText: string;
    @Input() nextText: string;
    @Input() lastText: string;
    @Input() rotate: boolean;
    @Input() pageBtnClass: string;
    /** ===   === */



    @HostBinding('class.thy-pagination') _pagination = true;

    @HostBinding('class.disabled')
    @Input()
    disabled: boolean;

    // config: ConfigModel ;
    // tslint:disable-next-line:no-inferrable-types
    protected _page: number = 1;
    protected _itemsPerPage: number;
    protected _totalItems: number;
    protected _totalPages: number;
    // tslint:disable-next-line:no-inferrable-types
    private reservedNum: number = 2;
    // tslint:disable-next-line:no-inferrable-types
    private pagerSize: number = 7;

    public pagerCount: number = this.pagerSize + this.reservedNum * 2;

    private onTouchedCallback: () => void = function () { };
    private onChangeCallback: (_: number) => void = function () { };

    // tslint:disable-next-line:member-ordering

    // tslint:disable-next-line:member-ordering
    @Output() numPages: EventEmitter<number> = new EventEmitter<number>();

    // tslint:disable-next-line:member-ordering
    @Output()
    pageChanged = new EventEmitter<PageChangedEvent>();

    @Input()
    get itemsPerPage(): number {
        return this._itemsPerPage;
    }

    set itemsPerPage(v: number) {
        this._itemsPerPage = v;
        if (this.totalItems !== undefined) {
            this.totalPages = this.calculateTotalPages();
        }
    }

    @Input()
    get totalItems(): number {
        return this._totalItems;
    }

    set totalItems(v: number) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }

    @Input()
    get totalPages(): number {
        return this._totalPages;
    }
    set totalPages(v: number) {
        this._totalPages = v;
        this.numPages.emit(v);
    }

    @Input()
    get page(): number {
        return this._page;
    }
    set page(v: number) {

        this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
        });

        if (v !== this._page) {
            this._page = v;
            this.onChangeCallback(v);
        }
    }

    writeValue(page: number) {
        if (page !== this._page) {
            this._page = page;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    constructor(
    ) {
    }

    ngOnInit() {
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : 10;

        if (typeof this.totalPages === 'undefined') {
            this.totalPages = this.calculateTotalPages();
        }

    }

    nextHandle(step: number): void {
        if (this.disabled) {
            return;
        }
        const nextPage: number = this.page + step;
        this.page = nextPage < 1 ? 1 : nextPage > this.totalPages ? this.totalPages : nextPage;
    }


    protected calculateTotalPages(): number {
        const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }
}

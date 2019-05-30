import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    forwardRef,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    HostBinding,
    ElementRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyPaginationConfigModel, ThyPaginationChangedEvent } from './pagination.class';
import { PaginationDefaultConfig, ThyPaginationConfig } from './pagination.config';
import { UpdateHostClassService } from '../shared';

const noop = () => {};

const CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyPaginationComponent),
    multi: true
};

@Component({
    selector: 'thy-pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CONTROL_VALUE_ACCESSOR, UpdateHostClassService]
})
export class ThyPaginationComponent implements OnInit, ControlValueAccessor {
    public config: ThyPaginationConfigModel = Object.assign({}, PaginationDefaultConfig, this.paginationConfig.config);

    @Input()
    set thyPageIndex(pageIndex: number) {
        this.pageIndex = pageIndex;
        if (this.initialized) {
            this.setPageIndex(pageIndex);
        }
    }

    @Input()
    set thyPageSize(pageSize: number) {
        this.pageSize = pageSize;
        if (this.initialized) {
            this.calculatePageCount();
            this.initializePages(this.pageIndex, this.pageCount);
            this.cdr.markForCheck();
        }
    }

    @Input()
    set thyTotal(total: number) {
        this.total = total;
        if (this.initialized) {
            this.calculatePageCount();
            this.initializePages(this.pageIndex, this.pageCount);
            this.cdr.markForCheck();
        }
    }

    @Input('thyShowJumper')
    set showJumper(value: boolean) {
        this.config.showJumper = value;
    }

    @Input('thySize')
    set size(size: 'sm' | 'lg') {
        this.updateHostClassService.addClass(`pagination-${size}`);
    }

    @Input('thyMaxCount')
    set maxCount(value: number) {
        this.config.maxCount = value;
    }

    @Input('thyMarginalCount') marginalCount = 2;

    @Input('thyRangeCount') rangeCount = 7;

    @Input('thyHideOnSinglePage') hideOnSinglePage: boolean;

    @Output('thyPageChanged') pageChanged = new EventEmitter<ThyPaginationChangedEvent>();

    public pages: { index?: number; text?: string; active?: boolean }[] = [];

    public pageIndex = 1;

    public pageSize: number;

    public pageCount: number;

    public total: number;

    public firstIndex = 1;

    public disabled = false;

    public isHideOnSinglePage = false;

    private onChangeCallback: (pageIndex: number) => void = noop;

    private initialized = false;

    @HostBinding('class.pagination') isPaginationClass = true;

    constructor(
        private paginationConfig: ThyPaginationConfig,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef,
        private cdr: ChangeDetectorRef
    ) {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
    }

    ngOnInit() {
        this.calculatePageCount();
        this.setPageIndex(this.pageIndex);
        this.initialized = true;
    }

    private setPageIndex(pageIndex: number) {
        this.pageIndex = pageIndex > this.pageCount ? this.pageCount : pageIndex || 1;
        this.initializePages(this.pageIndex, this.pageCount);
        this.cdr.markForCheck();
    }

    private calculatePageCount() {
        const pageCount = this.pageSize < 1 ? 1 : Math.ceil(this.total / this.pageSize);
        this.pageCount = Math.max(pageCount || 0, 1);
    }

    private makePage(index: number, text: string, active: boolean): { index: number; text: string; active: boolean } {
        return { index, text, active };
    }

    private initializePages(pageIndex: number, pageCount: number) {
        const marginalCount = this.marginalCount;
        const rangeCount = this.rangeCount;
        const maxCount = this.config.maxCount;
        let pages = [];
        const isMaxSized = pageCount > maxCount;
        if (isMaxSized) {
            const beforePages = [];
            const afterPages = [];

            // beforePages
            for (let i = 1; i <= marginalCount; i++) {
                beforePages.push(this.makePage(i, i.toString(), i === pageIndex));
            }
            if (pageIndex >= rangeCount) {
                beforePages.push(this.makePage(pageIndex - rangeCount, '...', null));
            }

            // afterPages
            if (pageCount - pageIndex >= rangeCount - 1) {
                afterPages.push(this.makePage(pageIndex + rangeCount, '...', null));
            }
            for (let i = pageCount - marginalCount + 1; i <= pageCount; i++) {
                afterPages.push(this.makePage(i, i.toString(), i === pageIndex));
            }

            // mainPages
            let start = Math.max(marginalCount + 1, pageIndex - (rangeCount - 1) / 2);
            let end = Math.min(pageIndex + (rangeCount - 1) / 2, pageCount - marginalCount);
            if (pageIndex < rangeCount) {
                end = rangeCount;
            }
            if (pageCount - pageIndex < rangeCount - 1) {
                start = pageCount - (rangeCount - 1);
            }
            for (let i = start; i <= end; i++) {
                pages.push({
                    index: i,
                    text: i.toString(),
                    active: i === pageIndex
                });
            }
            pages = [...beforePages, ...pages, ...afterPages];
        } else {
            for (let i = 1; i <= pageCount; i++) {
                pages.push({
                    index: i,
                    text: i.toString(),
                    active: i === pageIndex
                });
            }
        }
        this.pages = pages;
    }

    selectPage(pageIndex: number, event?: Event) {
        if (this.disabled) {
            return;
        }
        this.setPageIndex(pageIndex);
        this.onChangeCallback(pageIndex);
        this.pageChanged.emit({ event, page: pageIndex, pageIndex });
    }

    jumpPage(input: HTMLInputElement, event?: Event) {
        const pageIndex = +input.value;
        if (Number.isInteger(pageIndex)) {
            this.selectPage(pageIndex, event);
        }
        input.value = '';
    }

    writeValue(pageIndex: number): void {
        this.setPageIndex(pageIndex);
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {}

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}

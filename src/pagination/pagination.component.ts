import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    HostBinding,
    ElementRef,
    Optional,
    Inject,
    TemplateRef
} from '@angular/core';
import { ThyPaginationConfigModel } from './pagination.class';
import { PaginationDefaultConfig, DEFAULT_RANGE_COUNT, THY_PAGINATION_CONFIG, ThyPaginationConfig } from './pagination.config';
import { UpdateHostClassService } from '../shared';
import { isTemplateRef } from '../util/helpers';

@Component({
    selector: 'thy-pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateHostClassService]
})
export class ThyPaginationComponent implements OnInit {
    isTemplateRef = isTemplateRef;
    public config: ThyPaginationConfigModel = Object.assign({}, PaginationDefaultConfig, this.paginationConfig.main);

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

    @Input('thyDisabled') disabled = false;

    @Input('thyShowQuickJumper')
    set showQuickJumper(value: boolean) {
        this.config.showQuickJumper = value;
    }

    @Input('thySize')
    set size(size: 'sm' | 'lg') {
        this.updateHostClassService.addClass(`thy-pagination-${size}`);
    }

    @Input('thyMaxCount')
    set maxCount(value: number) {
        this.config.maxCount = value;
    }

    @Input('thyMarginalCount') marginalCount: number;

    @Input()
    set thyRangeCount(value: number) {
        if (Number.isInteger(value)) {
            this.config.rangeCount = value;
            if (this.initialized) {
                this.setMarginalCount(value);
            }
        }
    }

    @Input('thyHideOnSinglePage') hideOnSinglePage: boolean;

    @Output('thyPageIndexChange') pageIndexChange = new EventEmitter<number>();

    @Output('thyPageChanged') pageChanged = new EventEmitter<{ page: number }>();

    public pages: { index?: number; text?: string; active?: boolean }[] = [];

    public pageIndex = 1;

    public pageSize: number;

    public pageCount: number;

    public total: number;

    public range = { from: 0, to: 0 };

    public firstIndex = 1;

    public isHideOnSinglePage = false;

    private initialized = false;

    @HostBinding('class.thy-pagination') isPaginationClass = true;

    // 是否显示范围和total
    @HostBinding('class.thy-pagination-has-total')
    @Input('thyShowTotal')
    showTotal: boolean | TemplateRef<{ $implicit: number; range: { from: number; to: number } }> = false;

    constructor(
        @Optional()
        @Inject(THY_PAGINATION_CONFIG)
        private paginationConfig: ThyPaginationConfig,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef,
        private cdr: ChangeDetectorRef
    ) {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
    }

    ngOnInit() {
        this.setMarginalCount(this.config.rangeCount);
        this.calculatePageCount();
        this.setPageIndex(this.pageIndex);
        this.initialized = true;
    }

    private setMarginalCount(range: number) {
        if (!this.marginalCount) {
            this.marginalCount = range <= DEFAULT_RANGE_COUNT ? 1 : 2;
        }
    }

    private setPageIndex(pageIndex: number) {
        this.pageIndex = pageIndex > this.pageCount ? this.pageCount : pageIndex || 1;
        this.range = {
            from: (this.pageIndex - 1) * this.pageSize + 1,
            to: this.pageIndex * this.pageSize
        };
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
        const rangeCount = this.config.rangeCount;
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
            if (pageIndex - Math.ceil(rangeCount / 2) > this.firstIndex) {
                beforePages.push(this.makePage(pageIndex - rangeCount, '...', null));
            }

            // afterPages
            if (pageIndex + Math.ceil(rangeCount / 2) < pageCount) {
                afterPages.push(this.makePage(pageIndex + rangeCount, '...', null));
            }
            for (let i = pageCount - marginalCount + 1; i <= pageCount; i++) {
                afterPages.push(this.makePage(i, i.toString(), i === pageIndex));
            }

            // mainPages
            let start = Math.max(marginalCount + 1, pageIndex - (rangeCount - 1) / 2);
            let end = Math.min(pageIndex + (rangeCount - 1) / 2, pageCount - marginalCount);
            if (pageIndex - 1 <= marginalCount) {
                end = rangeCount;
            }
            if (pageCount - pageIndex <= marginalCount) {
                start = pageCount - rangeCount + 1;
            }

            for (let i = start; i <= end; i++) {
                pages.push({
                    index: i,
                    text: i.toString(),
                    active: i === +pageIndex
                });
            }
            pages = [...beforePages, ...pages, ...afterPages];
        } else {
            for (let i = 1; i <= pageCount; i++) {
                pages.push({
                    index: i,
                    text: i.toString(),
                    active: i === +pageIndex
                });
            }
        }
        this.pages = pages;
    }

    private pageChange(pageIndex: number) {
        this.pageIndexChange.emit(pageIndex);
        this.pageChanged.emit({ page: pageIndex });
    }

    selectPage(pageIndex: number) {
        if (this.disabled || pageIndex === this.firstIndex - 1 || pageIndex === this.pageCount + 1) {
            return;
        }
        this.setPageIndex(pageIndex);
        this.pageChange(this.pageIndex);
    }

    jumpPage(input: HTMLInputElement) {
        const pageIndex = +input.value;
        if (Number.isInteger(pageIndex)) {
            this.selectPage(pageIndex);
        }
        input.value = '';
    }
}

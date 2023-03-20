import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    HostBinding,
    Optional,
    Inject,
    TemplateRef
} from '@angular/core';
import { ThyPaginationConfigModel } from './pagination.class';
import { PaginationDefaultConfig, DEFAULT_RANGE_COUNT, THY_PAGINATION_CONFIG, ThyPaginationConfig } from './pagination.config';
import { useHostRenderer } from '@tethys/cdk/dom';
import { isTemplateRef } from 'ngx-tethys/util';
import { PaginationTotalCountFormat } from './pagination.pipe';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { ThyOptionComponent, ThyEnterDirective } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { ThySelectCustomComponent } from 'ngx-tethys/select';
import { NgIf, NgTemplateOutlet, NgFor } from '@angular/common';
import { InputBoolean, InputNumber } from 'ngx-tethys/core';

/**
 * 分页组件，当数据量过多时，使用分页分解数据。
 * @name thy-pagination
 * @order 10
 */
@Component({
    selector: 'thy-pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgTemplateOutlet,
        ThySelectCustomComponent,
        FormsModule,
        NgFor,
        ThyOptionComponent,
        ThyIconComponent,
        ThyEnterDirective,
        PaginationTotalCountFormat
    ]
})
export class ThyPaginationComponent implements OnInit {
    isTemplateRef = isTemplateRef;
    public config: ThyPaginationConfigModel = Object.assign({}, PaginationDefaultConfig, this.paginationConfig.main);

    /**
     * 设置当前页，支持双向绑定
     * @default 1
     */
    @Input()
    @InputNumber()
    set thyPageIndex(pageIndex: number) {
        this.pageIndex = pageIndex;
        if (this.initialized) {
            this.setPageIndex(pageIndex);
        }
    }

    /**
     * 每页条目数量
     * @default 20
     */
    @Input()
    @InputNumber()
    set thyPageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.selectPageSize = pageSize;
        if (this.initialized) {
            this.calculatePageCount();
            this.initializePages(this.pageIndex, this.pageCount);
            this.cdr.markForCheck();
        }
    }

    /**
     * 总页数 与 totalPages 二选一传入
     */
    @Input()
    @InputNumber()
    set thyTotal(total: number) {
        this.total = total;
        if (this.initialized) {
            this.calculatePageCount();
            this.setPageIndex(this.pageIndex);
            this.cdr.markForCheck();
        }
    }

    /**
     * 自定义分页页码，设置自定义分页页码后将不根据 Total 和 PageSize 来自动计算页码，完全以传入的页码为准
     */
    @Input()
    set thyCustomPages(pages: number[]) {
        this.customPages = pages;
        this.config.showTotalPageCount = false;
        if (this.initialized) {
            this.calculatePageCount();
            this.initializePages(this.pageIndex, this.pageCount);
            this.cdr.markForCheck();
        }
    }

    /**
     * 是否禁用
     */
    @Input('thyDisabled') @InputBoolean() disabled = false;

    /**
     * 是否显示快速跳转
     * @default false
     */
    @Input('thyShowQuickJumper')
    @InputBoolean()
    set showQuickJumper(value: boolean) {
        this.config.showQuickJumper = value;
    }

    /**
     * 设置是否显示总页数信息
     * @default true
     */
    @Input('thyShowTotalPageCount')
    @InputBoolean()
    set showTotalPageCount(value: boolean) {
        this.config.showTotalPageCount = value;
    }

    /**
     * 设置分页组件的大小
     * @type sm | md | lg
     * @default md
     */
    @Input('thySize')
    set size(size: 'sm' | 'md' | 'lg') {
        this.selectSize = size;
        this.hostRenderer.addClass(`thy-pagination-${size}`);
    }

    /**
     * 设置最大显示数量，超出最大显示数后会自动进行分割显示
     * @default 9
     */
    @Input('thyMaxCount')
    @InputNumber()
    set maxCount(value: number) {
        this.config.maxCount = value;
    }

    /**
     * 设置边缘显示数量
     * @default 2
     */
    @Input('thyMarginalCount') @InputNumber() marginalCount: number;

    /**
     * 设置中间区域显示数量
     * @default 7
     */
    @Input()
    @InputNumber()
    set thyRangeCount(value: number) {
        if (Number.isInteger(value)) {
            this.config.rangeCount = value;
            if (this.initialized) {
                this.setMarginalCount(value);
            }
        }
    }

    @Input('thyShowSizeChanger')
    @InputBoolean()
    set showSizeChanger(value: boolean) {
        this.config.showSizeChanger = value;
    }

    @Input('thyPageSizeOptions')
    set pageSizeOptions(value: number[]) {
        this.config.pageSizeOptions = value;
    }

    /**
     * 只有一页时是否隐藏分页器
     * @default false
     */
    @Input('thyHideOnSinglePage') @InputBoolean() hideOnSinglePage: boolean;

    /**
     * 页码改变的回调
     */
    @Output('thyPageIndexChange') pageIndexChange = new EventEmitter<number>();

    /**
     * 与Bootstrap pagination 兼容，后续版本会进行删除，参数保持与 bootstrap 一致
     */
    @Output('thyPageChanged') pageChanged = new EventEmitter<{ page: number }>();

    @Output('thyPageSizeChanged') pageSizeChanged = new EventEmitter<number>();

    public pages: { index?: number; text?: string; active?: boolean }[] = [];

    public pageIndex = 1;

    public pageSize: number;

    public pageCount: number;

    public customPages: number[];

    public total: number;

    public range = { from: 0, to: 0 };

    public firstIndex = 1;

    public isHideOnSinglePage = false;

    private initialized = false;

    private hostRenderer = useHostRenderer();

    public selectSize = 'md';

    public selectPageSize: Number = 20;

    @HostBinding('class.thy-pagination') isPaginationClass = true;

    /**
     * 是否显示范围和total
     * @default false
     */
    @HostBinding('class.thy-pagination-has-total')
    @Input('thyShowTotal')
    showTotal: boolean | TemplateRef<{ $implicit: number; range: { from: number; to: number } }> = false;

    constructor(
        @Optional()
        @Inject(THY_PAGINATION_CONFIG)
        private paginationConfig: ThyPaginationConfig,
        private cdr: ChangeDetectorRef
    ) {}

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
        const toPageSize = this.pageIndex * this.pageSize;
        this.range = {
            from: (this.pageIndex - 1) * this.pageSize + 1,
            to: toPageSize > this.total ? this.total : toPageSize
        };
        this.initializePages(this.pageIndex, this.pageCount);
        this.cdr.markForCheck();
    }

    private calculatePageCount() {
        let pageCount = null;
        if (this.customPages && this.customPages.length > 0) {
            pageCount = this.customPages[this.customPages.length - 1];
        } else {
            pageCount = this.pageSize < 1 ? 1 : Math.ceil(this.total / this.pageSize);
        }
        this.pageCount = Math.max(pageCount || 0, 1);
    }

    private makePage(index: number, text: string, active: boolean): { index: number; text: string; active: boolean } {
        return { index, text, active };
    }

    private initializePages(pageIndex: number, pageCount: number) {
        if (this.customPages && this.customPages.length > 0) {
            this.pages = this.customPages.map(page => {
                return {
                    index: page,
                    text: page.toString(),
                    active: page === +pageIndex
                };
            });
            return;
        }

        let pages = [];
        const marginalCount = this.marginalCount;
        const rangeCount = this.config.rangeCount;
        const maxCount = this.config.maxCount;
        const isMaxSized = pageCount > maxCount;
        if (isMaxSized) {
            const beforePages = [];
            const afterPages = [];

            // beforePages
            for (let i = 1; i <= marginalCount; i++) {
                beforePages.push(this.makePage(i, i.toString(), i === pageIndex));
            }
            if (pageIndex - Math.ceil(rangeCount / 2) > this.firstIndex) {
                beforePages.push(this.makePage(pageIndex - rangeCount, '···', null));
            }

            // afterPages
            if (pageIndex + Math.ceil(rangeCount / 2) < pageCount) {
                afterPages.push(this.makePage(pageIndex + rangeCount, '···', null));
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

    onPageSizeChange(event: number) {
        this.pageSize = event;
        this.calculatePageCount();
        this.setPageIndex(this.pageIndex);
        this.pageSizeChanged.emit(event);
    }
}

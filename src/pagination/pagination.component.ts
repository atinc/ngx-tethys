import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    numberAttribute,
    inject,
    Signal,
    input,
    output,
    effect,
    computed,
    signal,
    model,
    WritableSignal,
    ModelSignal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySelect } from 'ngx-tethys/select';
import { ThyEnterDirective, ThyOption } from 'ngx-tethys/shared';
import { coerceBooleanProperty, isTemplateRef, ThyBooleanInput , isString, isArray, isBoolean } from 'ngx-tethys/util';
import { ThyPaginationConfigModel } from './pagination.class';
import { PaginationDefaultConfig, THY_PAGINATION_CONFIG, DEFAULT_RANGE_COUNT } from './pagination.config';
import { PaginationPerPageFormat, PaginationTotalCountFormat } from './pagination.pipe';
import { injectLocale, ThyI18nLocale, ThyPaginationLocale } from 'ngx-tethys/i18n';
/**
 * 分页组件，当数据量过多时，使用分页分解数据。
 * @name thy-pagination
 * @order 10
 */
@Component({
    selector: 'thy-pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgTemplateOutlet,
        ThySelect,
        FormsModule,
        ThyOption,
        ThyIcon,
        ThyEnterDirective,
        PaginationTotalCountFormat,
        PaginationPerPageFormat
    ],
    host: {
        class: 'thy-pagination',
        '[class.thy-pagination-sm]': 'thySize() === "sm"',
        '[class.thy-pagination-md]': 'thySize() === "md"',
        '[class.thy-pagination-lg]': 'thySize() === "lg"',
        '[class.thy-pagination-has-total]': 'thyShowTotal()'
    }
})
export class ThyPagination {
    private paginationConfig = inject(THY_PAGINATION_CONFIG, { optional: true })!;

    allLocale: Signal<ThyI18nLocale> = injectLocale();

    paginationLocale: Signal<ThyPaginationLocale> = injectLocale('pagination');

    isTemplateRef = isTemplateRef;

    /**
     * 设置当前页，支持双向绑定
     * @default 1
     */
    readonly thyPageIndex = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 每页条目数量
     * @default 20
     */
    readonly thyPageSize = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 数据总数
     */
    readonly thyTotal = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 自定义分页页码，设置自定义分页页码后将不根据 Total 和 PageSize 来自动计算页码，完全以传入的页码为准
     * @type number[]
     */
    readonly thyCustomPages = input<number[]>();

    /**
     * 是否禁用
     */
    readonly thyDisabled = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 是否显示快速跳转
     * @default false
     */
    readonly thyShowQuickJumper = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

    /**
     * 设置是否显示总页数信息
     * @default true
     */
    readonly thyShowTotalPageCount = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

    /**
     * 设置分页组件的大小
     * @type sm | md | lg
     * @default md
     */
    readonly thySize = input<'sm' | 'md' | 'lg'>('md', { alias: 'thySize' });

    /**
     * 设置最大显示数量，超出最大显示数后会自动进行分割显示
     * @default 9
     */
    readonly thyMaxCount = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 设置边缘显示数量
     * @default 2
     */
    readonly thyMarginalCount = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 设置中间区域显示数量
     * @default 5
     */
    readonly thyRangeCount = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 是否显示分页大小选择器
     * @default false
     */
    readonly thyShowSizeChanger = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

    /**
     * @type number[]
     */
    readonly thyPageSizeOptions = input<number[]>(undefined);

    /**
     * 只有一页时是否隐藏分页器
     * @default false
     */
    readonly thyHideOnSinglePage = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

    /**
     * 分页器单位
     * @default 条
     */
    readonly thyUnit = input<string>();

    /**
     * 是否显示范围和total
     * @default false
     */

    readonly thyShowTotal = input<boolean | TemplateRef<{ $implicit: number; range: { from: number; to: number } }>>(false);

    /**
     * 页码改变的回调
     */
    readonly thyPageIndexChange = output<number>();

    /**
     * 与Bootstrap pagination 兼容，后续版本会进行删除，参数保持与 bootstrap 一致
     */
    readonly thyPageChanged = output<{ page: number }>();

    readonly thyPageSizeChanged = output<number>();

    public currentPageIndex = signal(1);

    public currentPageSize: WritableSignal<number> = signal(null);

    public selectedPageSize: ModelSignal<number> = model();

    public firstIndex = 1;

    computedConfig: Signal<ThyPaginationConfigModel> = computed(() => {
        const result: ThyPaginationConfigModel = Object.assign(
            {},
            PaginationDefaultConfig,
            {
                firstText: this.paginationLocale().firstPage,
                lastText: this.paginationLocale().lastPage,
                totalPagesFormat: this.paginationLocale().totalCount,
                unit: this.paginationLocale().defaultUnit
            },
            this.paginationConfig.main
        );

        if (isBoolean(this.thyShowQuickJumper())) {
            result.showQuickJumper = this.thyShowQuickJumper();
        }

        if (isBoolean(this.thyShowTotalPageCount())) {
            result.showTotalPageCount = this.thyShowTotalPageCount();
        }

        if (this.thyCustomPages() && isArray(this.thyCustomPages())) {
            result.showTotalPageCount = false;
        }

        if (Number.isInteger(this.thyMaxCount())) {
            result.maxCount = this.thyMaxCount();
        }

        if (isString(this.thyUnit()) && this.thyUnit()) {
            result.unit = this.thyUnit();
        }

        if (isBoolean(this.thyShowSizeChanger())) {
            result.showSizeChanger = this.thyShowSizeChanger();
        }

        if (this.thyPageSizeOptions() && isArray(this.thyPageSizeOptions())) {
            result.pageSizeOptions = this.thyPageSizeOptions();
        }

        if (Number.isInteger(this.thyRangeCount())) {
            result.rangeCount = this.thyRangeCount();
        }

        return result;
    });

    marginalCount = computed(() => {
        if (!this.thyMarginalCount()) {
            return this.computedConfig().rangeCount <= DEFAULT_RANGE_COUNT ? 1 : 2;
        } else {
            return this.thyMarginalCount();
        }
    });

    computedPageCount = computed(() => {
        let pageCount = null;
        if (this.thyCustomPages() && this.thyCustomPages().length > 0) {
            pageCount = this.thyCustomPages()[this.thyCustomPages().length - 1];
        } else {
            pageCount = this.currentPageSize() < 1 ? 1 : Math.ceil(this.thyTotal() / this.currentPageSize());
        }
        return Math.max(pageCount || 0, 1);
    });

    computedPages = computed(() => {
        const pageCount = this.computedPageCount();
        const pageIndex = this.currentPageIndex();
        const config = this.computedConfig();

        if (this.thyCustomPages() && this.thyCustomPages().length > 0) {
            return this.thyCustomPages().map(page => {
                return { index: page, text: page.toString(), active: page === +pageIndex };
            });
        }

        let pages = [];
        const marginalCount = this.marginalCount();
        const rangeCount = config.rangeCount;
        const maxCount = config.maxCount;
        const isMaxSized = pageCount > maxCount;
        if (isMaxSized) {
            const beforePages = [];
            const afterPages = [];

            // mainPages
            let start = Math.ceil(Math.max(marginalCount + 1, pageIndex - (rangeCount - 1) / 2));
            let end = Math.ceil(Math.min(pageIndex + (rangeCount - 1) / 2, pageCount - marginalCount));
            if (pageIndex - 1 < marginalCount) {
                end = rangeCount;
            }
            if (pageCount - pageIndex <= marginalCount) {
                start = pageCount - rangeCount + 1;
            }

            for (let i = start; i <= end; i++) {
                pages.push({ index: i, text: i.toString(), active: i === +pageIndex });
            }

            // beforePages
            for (let i = 1; i <= marginalCount; i++) {
                beforePages.push(this.makePage(i, i.toString(), i === pageIndex));
            }

            if (pageIndex - Math.ceil(rangeCount / 2) > this.firstIndex && marginalCount + 1 < start) {
                beforePages.push(this.makePage(Math.ceil((marginalCount + start) / 2), '···', null));
            }

            // afterPages
            if (pageIndex + Math.ceil(rangeCount / 2) < pageCount && pageCount - marginalCount > end) {
                afterPages.push(this.makePage(Math.ceil((pageCount - marginalCount + 1 + end) / 2), '···', null));
            }
            for (let i = pageCount - marginalCount + 1; i <= pageCount; i++) {
                afterPages.push(this.makePage(i, i.toString(), i === pageIndex));
            }

            pages = [...beforePages, ...pages, ...afterPages];
        } else {
            for (let i = 1; i <= pageCount; i++) {
                pages.push({ index: i, text: i.toString(), active: i === +pageIndex });
            }
        }
        return pages;
    });

    computedRange = computed(() => {
        const pageIndex = this.currentPageIndex();
        const pageSize = this.currentPageSize();
        const total = this.thyTotal();
        const toPageSize = pageIndex * pageSize;
        return { from: (pageIndex - 1) * pageSize + 1, to: toPageSize > total ? total : toPageSize };
    });

    constructor() {
        effect(() => {
            const pageIndex = this.thyPageIndex();
            if (Number.isInteger(pageIndex)) {
                this.setPageIndex(pageIndex);
            }
        });

        effect(() => {
            let pageSize = this.thyPageSize();

            if (Number.isInteger(pageSize)) {
                this.currentPageSize.set(pageSize);
                this.selectedPageSize.set(pageSize);
            } else {
                const config = this.computedConfig();
                if (config.pageSizeOptions && config.pageSizeOptions.length > 0) {
                    pageSize = config.pageSizeOptions[0];
                } else {
                    pageSize = config.pageSize;
                }
                this.currentPageSize.set(pageSize);
                this.selectedPageSize.set(pageSize);
            }
        });
    }

    private setPageIndex(pageIndex: number) {
        pageIndex = pageIndex > this.computedPageCount() ? this.computedPageCount() : pageIndex || 1;
        this.currentPageIndex.set(pageIndex);
    }

    private makePage(index: number, text: string, active: boolean): { index: number; text: string; active: boolean } {
        return { index, text, active };
    }

    private pageChange(pageIndex: number) {
        this.thyPageIndexChange.emit(pageIndex);
        this.thyPageChanged.emit({ page: pageIndex });
    }

    selectPage(pageIndex: number) {
        if (this.thyDisabled() || pageIndex === this.firstIndex - 1 || pageIndex === this.computedPageCount() + 1) {
            return;
        }
        this.setPageIndex(pageIndex);
        this.pageChange(this.currentPageIndex());
    }

    jumpPage(input: HTMLInputElement) {
        const pageIndex = +input.value;
        if (Number.isInteger(pageIndex)) {
            this.selectPage(pageIndex);
        }
        input.value = '';
    }

    onPageSizeChange(event: number) {
        this.currentPageSize.set(event);
        this.setPageIndex(event);
        this.thyPageSizeChanged.emit(event);
    }
}

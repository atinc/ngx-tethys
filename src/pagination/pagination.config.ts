import { InjectionToken } from '@angular/core';
import { ThyPaginationConfigModel } from './pagination.class';

export const DEFAULT_RANGE_COUNT = 5;

export const PaginationDefaultConfig: ThyPaginationConfigModel = {
    boundaryLinks: false,
    directionLinks: true,
    pageSize: 20,
    maxCount: 7,
    rangeCount: DEFAULT_RANGE_COUNT,
    showQuickJumper: true,
    showTotalPageCount: true,
    firstText: '第一页',
    lastText: '最后一页',
    previousText: '',
    nextText: '',
    firstIcon: '',
    lastIcon: '',
    previousIcon: 'angle-left',
    nextIcon: 'angle-right',
    totalPagesFormat: '共{total}页',
    showSizeChanger: false,
    pageSizeOptions: [10, 20, 50, 100],
    suffixUnit: '条'
};
export interface ThyPaginationConfig {
    main?: ThyPaginationConfigModel;
}

export const THY_PAGINATION_CONFIG = new InjectionToken<ThyPaginationConfig>('THY_PAGINATION_CONFIG', {
    providedIn: 'root',
    factory: () => {
        return {};
    }
});

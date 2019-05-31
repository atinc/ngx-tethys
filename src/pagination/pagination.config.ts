import { Injectable, InjectionToken } from '@angular/core';
import { ThyPaginationConfigModel } from './pagination.class';

export const DEFAULT_RANGE_COUNT = 7;

export const PaginationDefaultConfig: ThyPaginationConfigModel = {
    boundaryLinks: false,
    directionLinks: true,
    pageSize: 20,
    maxCount: 9,
    rangeCount: DEFAULT_RANGE_COUNT,
    showQuickJumper: false,
    firstText: '第一页',
    lastText: '最后一页',
    previousText: '上一页',
    nextText: '下一页',
    firstIcon: '',
    lastIcon: '',
    previousIcon: '',
    nextIcon: '',
    totalPagesFormat: '共{total}页'
};
export interface ThyPaginationConfig {
    main: ThyPaginationConfigModel;
}

export const THY_PAGINATION_CONFIG = new InjectionToken<ThyPaginationConfig>('THY_PAGINATION_CONFIG');

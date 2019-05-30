import { Injectable } from '@angular/core';
import { ThyPaginationConfigModel } from './pagination.class';

export const PaginationDefaultConfig: ThyPaginationConfigModel = {
    boundaryLinks: false,
    directionLinks: true,
    pageSize: 20,
    maxCount: 9,
    showJumper: false,
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

@Injectable()
export class ThyPaginationConfig {
    config: ThyPaginationConfigModel = {};
}

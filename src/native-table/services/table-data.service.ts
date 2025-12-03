import { Injectable, signal, computed, effect } from '@angular/core';
import { ThyPage } from 'ngx-tethys/table';
import { ThyNativeTableSortOrder } from '../table.interface';

export interface ThyNativeTableSortInfo {
    key: string | null;
    direction: ThyNativeTableSortOrder | null;
}

/**
 * 前端分页、前端排序, 需要计算数据
 */
@Injectable()
export class ThyNativeTableDataService<T = any> {
    /**
     * 原始表格数据
     */
    private readonly data = signal<readonly T[]>([]);

    /**
     * 分页信息
     */
    private readonly pagination = signal<ThyPage>({
        index: 1,
        size: 20,
        total: 0,
        sizeOptions: [20, 50, 100]
    });

    /**
     * 排序信息
     */
    private readonly sortInfo = signal<ThyNativeTableSortInfo>({
        key: null,
        direction: null
    });

    /**
     * 是否启用前端分页
     */
    private readonly frontEndPagination = signal<boolean>(false);

    /**
     * 是否启用前端排序
     */
    private readonly frontEndSort = signal<boolean>(false);

    private readonly _sortedData = computed<readonly T[]>(() => {
        const data = this.data();

        // TODO: 处理前端排序逻辑
        return data;
    });

    readonly renderedData = computed<readonly T[]>(() => {
        const sourceData = this._sortedData();

        // TODO: 处理前端分页逻辑
        return sourceData;
    });

    constructor() {}
}

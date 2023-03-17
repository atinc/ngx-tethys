import { Observable } from 'rxjs';

import { TemplateRef } from '@angular/core';

export interface MentionDefaultDataItem {
    name?: string;
}

export interface Mention<T = unknown> {
    /**
     * Mention 触发字符，比如 @ #
     */
    trigger: string;

    /**
     * Mention 选择数据源
     */
    data: T[];

    /**
     * Mention 列表自定义模板
     */
    suggestionsTemplateRef?: TemplateRef<{ data: T[] }>;

    /**
     * 限制最大显示多少条数据
     */
    limit?: number;

    /**
     * 设置未匹配到数据时是否自动关闭
     * @description.en-us content not found closed auto
     */
    autoClose?: boolean;

    /**
     * 设置弹出Popover Class
     */
    popoverClass?: string;

    /**
     * 显示选择项的模板，默认只显示 name
     */
    displayTemplateRef?: TemplateRef<T>;

    /**
     * 未匹配到数据的内容
     */
    emptyText?: string;

    /**
     * 插入字符转换器，默认插入 ${trigger}${name}
     */
    insertTransform?: (item: T) => string;

    /**
     * 搜索函数，支持返回异步Observable数据
     */
    search?: (term: string, items?: T[]) => T[] | Observable<T[]>;
}

export interface MentionSuggestionSelectEvent<T = any> {
    event: Event;
    item: T;
}

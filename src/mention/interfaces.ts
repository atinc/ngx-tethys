import { TemplateRef } from '@angular/core';

export interface MentionDefaultDataItem {
    name?: string;
}

export interface Mention<T = any> {
    trigger: string;
    data: T[];
    limit?: number;
    insertTransform?: (item: T) => string;
    search?: (term: string, items: T[]) => T[];
    displayTemplateRef?: TemplateRef<T>;
}

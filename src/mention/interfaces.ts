import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface MentionDefaultDataItem {
    name?: string;
}

export interface Mention<T = any> {
    trigger: string;
    data: T[];
    limit?: number;
    insertTransform?: (item: T) => string;
    search?: (term: string, items?: T[]) => T[] | Observable<T[]>;
    displayTemplateRef?: TemplateRef<T>;
    emptyText?: string;
}

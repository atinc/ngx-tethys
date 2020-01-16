import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface MentionDefaultDataItem {
    name?: string;
}

export interface Mention<T = any> {
    trigger: string;
    data: T[];
    limit?: number;
    // content not found closed auto
    autoClose?: boolean;
    popoverClass?: string;
    displayTemplateRef?: TemplateRef<T>;
    emptyText?: string;
    insertTransform?: (item: T) => string;
    search?: (term: string, items?: T[]) => T[] | Observable<T[]>;
}

export interface MentionSuggestionSelectEvent<T = any> {
    event: Event;
    item: T;
}

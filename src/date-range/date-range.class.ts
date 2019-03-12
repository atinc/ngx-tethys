export type AttachTypes = 'day' | 'week' | 'month' | 'year';

export class DateRangeItemInfo {
    begin?: number;
    end?: number;
    key?: string;
    text?: string;
    timestamp?: { interval?: number; unit?: AttachTypes };
}

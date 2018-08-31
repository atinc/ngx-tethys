export type AttachTypes = 'day' | 'month' | 'year';

export class DateRangeItemInfo {
    begin?: number;
    end?: number;
    key?: string;
    text?: string;
    timestamp?: { interval?: number, unit?: AttachTypes };
}

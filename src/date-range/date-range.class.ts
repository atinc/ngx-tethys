export type AttachTypes = 'day' | 'month' | 'year';

export class DateRangeItemInfo {
    /**
     * 开始时间
     */
    begin?: number;

    /**
     * 截止时间
     */
    end?: number;

    /**
     * 时间段的唯一标识，如'week'、'month'
     */
    key?: string;

    /**
     * 时间段的展示文本
     */
    text?: string;

    /**
     * 自定义时间段规则，interval为时间间隔；unit可选值有'day' | 'month' | 'year'
     */
    timestamp?: { interval?: number; unit?: AttachTypes };
}

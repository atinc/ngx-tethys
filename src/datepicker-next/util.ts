import { ThyDatepickerNextCalendarDate } from './datepicker-next.interface';

export function getCountMonthDays(date: Date) {
    const curDate = date || new Date();
    curDate.setMonth(curDate.getMonth() + 1);
    curDate.setDate(0);
    return curDate.getDate();
}

export function sliceArray(array: any, size: number) {
    const result = [];
    for (let x = 0; x < Math.ceil(array.length / size); x++) {
        const start = x * size;
        const end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}

export function calendarDateConvert(year: number, month: number, day?: number): ThyDatepickerNextCalendarDate {
    if (month < 0 || month >= 12 || day < 0 || day >= 28) {
        const date = new Date(year, month, day || 1);
        return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
    } else {
        return { year, month, day };
    }
}

export function getFullTimeText(value: number): string {
    if (value < 10) {
        return `0${value}`;
    }
    return value + '';
}




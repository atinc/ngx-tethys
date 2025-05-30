import * as dateFns from 'date-fns';
import * as dateFnsLocales from 'date-fns/locale';
import { ThyLocaleType } from 'ngx-tethys/i18n';

export const differenceInCalendarDays = dateFns.differenceInCalendarDays;
export const differenceInCalendarMonths = dateFns.differenceInCalendarMonths;
export const differenceInCalendarYears = dateFns.differenceInCalendarYears;
export const differenceInCalendarQuarters = dateFns.differenceInCalendarQuarters;
export const differenceInWeeks = dateFns.differenceInWeeks;
export const differenceInHours = dateFns.differenceInHours;
export const differenceInMinutes = dateFns.differenceInMinutes;
export const differenceInSeconds = dateFns.differenceInSeconds;
export const differenceInDays = dateFns.differenceInDays;
export const differenceInMonths = dateFns.differenceInMonths;
export const differenceInYears = dateFns.differenceInYears;
export const isSameDay = dateFns.isSameDay;
export const isSameHour = dateFns.isSameHour;
export const isSameMinute = dateFns.isSameMinute;
export const isSameMonth = dateFns.isSameMonth;
export const isSameSecond = dateFns.isSameSecond;
export const isSameYear = dateFns.isSameYear;
export const isSameQuarter = dateFns.isSameQuarter;
export const isToday = dateFns.isToday;
export const isTomorrow = dateFns.isTomorrow;
export const isValid = dateFns.isValid;
export const isAfter = dateFns.isAfter;
export const setYear = dateFns.setYear;
export const startOfMonth = dateFns.startOfMonth;
export const startOfWeek = dateFns.startOfWeek;
export const addMonths = dateFns.addMonths;
export const addYears = dateFns.addYears;
export const setDay = dateFns.setDay;
export const setDate = dateFns.setDate;
export const setMonth = dateFns.setMonth;
export const setQuarter = dateFns.setQuarter;
export const getUnixTime = dateFns.getUnixTime;
export const startOfDay = dateFns.startOfDay;
export const endOfDay = dateFns.endOfDay;
export const fromUnixTime = dateFns.fromUnixTime;
export const isWeekend = dateFns.isWeekend;
export const getTime = dateFns.getTime;
export const getDay = dateFns.getDay;
export const getWeek = dateFns.getWeek;
export const getMonth = dateFns.getMonth;
export const getYear = dateFns.getYear;
export const getDate = dateFns.getDate;
export const getHours = dateFns.getHours;
export const getMinutes = dateFns.getMinutes;
export const getSeconds = dateFns.getSeconds;
export const getDaysInMonth = dateFns.getDaysInMonth;
export const addSeconds = dateFns.addSeconds;
export const addMinutes = dateFns.addMinutes;
export const addHours = dateFns.addHours;
export const addWeeks = dateFns.addWeeks;
export const addQuarters = dateFns.addQuarters;
export const startOfQuarter = dateFns.startOfQuarter;
export const startOfYear = dateFns.startOfYear;
export const startOfMinute = dateFns.startOfMinute;
export const startOfHour = dateFns.startOfHour;
export const startOfISOWeek = dateFns.startOfISOWeek;
export const endOfMinute = dateFns.endOfMinute;
export const endOfHour = dateFns.endOfHour;
export const endOfWeek = dateFns.endOfWeek;
export const endOfMonth = dateFns.endOfMonth;
export const endOfQuarter = dateFns.endOfQuarter;
export const endOfYear = dateFns.endOfYear;
export const endOfISOWeek = dateFns.endOfISOWeek;
export const format = dateFns.format;
export const getQuarter = dateFns.getQuarter;
export const addDays = dateFns.addDays;
export const subMilliseconds = dateFns.subMilliseconds;
export const subSeconds = dateFns.subSeconds;
export const subMinutes = dateFns.subMinutes;
export const subHours = dateFns.subHours;
export const subDays = dateFns.subDays;
export const subBusinessDays = dateFns.subBusinessDays;
export const subWeeks = dateFns.subWeeks;
export const subMonths = dateFns.subMonths;
export const subQuarters = dateFns.subQuarters;
export const subYears = dateFns.subYears;
export const eachDayOfInterval = dateFns.eachDayOfInterval;
export const eachWeekOfInterval = dateFns.eachWeekOfInterval;
export const eachMonthOfInterval = dateFns.eachMonthOfInterval;
export const eachYearOfInterval = dateFns.eachYearOfInterval;
export const eachHourOfInterval = dateFns.eachHourOfInterval;
export const setDefaultOptions = dateFns.setDefaultOptions;
export const formatDistance = dateFns.formatDistance;

export const getDateFnsLocale = (locale: string) => {
    switch (locale) {
        case ThyLocaleType.zhHans:
            return dateFnsLocales[`zhCN`];
        case ThyLocaleType.zhHant:
            return dateFnsLocales[`zhTW`];
        case ThyLocaleType.enUs:
            return dateFnsLocales[`enUS`];
        case ThyLocaleType.jaJp:
            return dateFnsLocales[`ja`];
        case ThyLocaleType.deDe:
            return dateFnsLocales[`de`];
        default:
            return dateFnsLocales[`zhCN`];
    }
};

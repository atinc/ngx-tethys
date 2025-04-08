import { ThyLocaleType } from '../i18n';

export default {
    id: ThyLocaleType.enUs,
    layout: {
        expand: 'Expand',
        collapse: 'Collapse'
    },
    datePicker: {
        yearFormat: 'yyyy', // eg. 2025
        monthFormat: 'MMM', // eg. Sep
        zhMonthFormat: 'MMM', // eg. Sep
        weekFormat: 'EEE', // eg. Tue
        fullWeekFormat: 'EEE', // eg. Tue
        weekThFormat: 'yyyy-ww', //  eg. 2025-01st、2025-02nd、2025-03rd、2025-27th
        dateFormat: 'yyyy-MM-dd', // eg. 2025-09-02

        yearText: 'Year',
        quarterText: 'Quarter',
        monthText: 'Month',
        week: 'Week',
        prefixWeek: '',

        previousYear: 'Previous year',
        nextYear: 'Next year',
        previousMonth: 'Previous month',
        nextMonth: 'Next month',

        today: 'Today',
        tomorrow: 'Tomorrow',
        nextWeek: 'Next week',
        lastSevenDays: 'Recent 7 days',
        lastThirtyDays: 'Recent 30 days',
        currentMonth: 'This month',
        currentWeek: 'This week',

        advance: 'Advance',
        custom: 'Custom',

        startDate: 'Start date',
        endDate: 'End date',

        setTime: 'Set time',
        placeholder: 'Select date',

        ok: 'Ok',
        clear: 'Clear'
    },
    dateRange: {
        custom: 'Custom',
        currentWeek: 'This week',
        currentMonth: 'This month'
    },
    timePicker: {
        placeholder: 'Select time',
        now: 'Now',
        ok: 'Ok'
    },
    calendar: {
        today: 'Today',
        yearMonthFormat: 'yyyy-MM' // eg. 2025-09
    },
    autocomplete: {
        empty: 'No data available'
    },
    transfer: {
        maxLimit: '(Max limit: {max})',
        maxLockLimit: 'Lock (Max limit: {maxLock})',
        unlocked: 'Unlocked'
    },
    colorPicker: {
        defaultColor: 'Default color',
        noFillColor: 'No fill color',
        recentUsedColor: 'Recently used custom color',
        customColor: 'Custom color',
        none: 'None'
    },
    strength: {
        highest: 'Highest',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
    },
    guider: {
        skip: 'Skip',
        prev: 'Previous',
        next: 'Next',
        finish: 'Finish'
    },
    copy: {
        tips: 'Click to copy',
        success: 'Copy succeeded',
        error: 'Copy failed'
    },
    nav: {
        more: 'More'
    },
    dialog: {
        title: 'Confirm',
        ok: 'Ok',
        cancel: 'Cancel'
    },
    select: {
        placeholder: 'Select',
        empty: 'No data available'
    },
    treeSelect: {
        placeholder: 'Select',
        empty: 'No data available'
    },
    cascader: {
        placeholder: 'Select',
        empty: 'No data available'
    },
    pagination: {
        page: 'page',
        order: 'No.',
        total: 'Total: ',
        totalCount: 'Total: {total}',
        jumpTo: 'Go to',
        firstPage: 'First page',
        lastPage: 'Last page',
        defaultUnit: ''
    },
    form: {
        required: 'This option is required',
        maxlength: 'Input cannot exceed {maxlength} characters',
        minlength: 'Input must be at least {minlength} characters',
        uniqueCheck: 'Value already exists, please try again',
        email: 'Invalid email format',
        confirm: 'Inputs do not match',
        pattern: 'Invalid input format',
        number: 'A number is required',
        url: 'Invalid URL format',
        max: 'Input cannot be greater than {max}',
        min: 'Input cannot be less than {min}'
    },
    empty: {
        noDataText: 'No data available'
    }
};

/**
 *  Format options:
 *  | Field type         | Format      | Description                                | Example Value                   |
 *  |--------------------|-------------|--------------------------------------------|---------------------------------|
 *  | Year               | y           | Numeric: minimum digits                    | 2, 20, 201, 2017, 20173         |
 *  |                    | yy          | Numeric: 2 digits + zero padded            | 02, 20, 01, 17, 73              |
 *  |                    | yyy         | Numeric: 3 digits + zero padded            | 002, 020, 201, 2017, 20173      |
 *  |                    | yyyy        | Numeric: 4 digits or more + zero padded    | 0002, 0020, 0201, 2017, 20173   |
 *  | Month              | M           | Numeric: 1 digit                           | 9, 12                           |
 *  |                    | MM          | Numeric: 2 digits + zero padded            | 09, 12                          |
 *  |                    | MMM         | Abbreviated                                | Sep                             |
 *  |                    | MMMM        | Wide                                       | September                       |
 *  |                    | MMMMM       | Narrow                                     | S                               |
 *  | Week day           | E, EE & EEE | Abbreviated                                | Tue                             |
 *  |                    | EEEE        | Wide                                       | Tuesday                         |
 *  |                    | EEEEE       | Narrow                                     | T                               |
 *  |                    | EEEEEE      | Short                                      | Tu                              |
 *  | ISO Week of year   | w           | Numeric: minimum digits                    | 1... 53                         |
 *  |                    | ww          | Numeric: 2 digits + zero padded            | 01... 53                        |
 *
 */

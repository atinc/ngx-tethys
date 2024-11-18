export default {
    id: 'en-us',
    datePicker: {
        yearFormat: 'yyyy', // eg. 2025
        monthFormat: 'MMM', // eg. Sep
        zhMonthFormat: 'MMM', // eg. Sep
        weekFormat: 'EEE', // eg. Tue
        fullWeekFormat: 'EEE', // eg. Tue
        weekThFormat: 'yyyy-ww', //  eg. 2025-01st、2025-02nd、2025-03rd、2025-27th
        dateFormat: 'yyyy-MM-dd' // eg. 2025-09-02
    },
    calendar: {
        today: 'Today',
        yearMonthFormat: 'yyyy-MM' // eg. 2025-09
    },
    transfer: {
        maxLimit: '(Max limit: {max})',
        maxLockLimit: 'Lock (Max limit: {maxLock})',
        unlocked: 'Unlocked'
    },
    guider: {
        skip: 'Skip',
        prev: 'Previous step',
        next: 'Next step',
        finish: 'Finish'
    },
    copy: {
        tips: 'Click to copy',
        success: 'Copied',
        error: 'Failed'
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

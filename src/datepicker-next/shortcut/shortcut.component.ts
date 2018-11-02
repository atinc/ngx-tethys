import { Component, OnInit, HostBinding } from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from '../datepicker-next.store';
import { DatepickerNextCalendarViewModeEnum } from '../datepicker-next.interface';

enum ThyDatepickerNextShortcutTypeEnum {
    today = 'today',
    tomorrow = 'tomorrow',
    aWeekLater = 'aWeekLater',
}

@Component({
    selector: 'thy-datepicker-next-shortcut',
    templateUrl: 'shortcut.component.html'
})

export class ThyDatepickerNextShortcutComponent implements OnInit {

    @HostBinding('class') stylesClass = 'shortcut-container';

    shortcutTypeEnum = ThyDatepickerNextShortcutTypeEnum;

    constructor(
        public store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() { }

    shortcutClick(type: ThyDatepickerNextShortcutTypeEnum) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        let day = today.getDate();
        switch (type) {
            case this.shortcutTypeEnum.today:
                break;
            case this.shortcutTypeEnum.tomorrow:
                day += 1;
                break;
            case this.shortcutTypeEnum.aWeekLater:
                day += 7;
                break;
        }
        this.store.dispatch(datepickerNextActions.changeCalendarViewMode, { viewMode: DatepickerNextCalendarViewModeEnum.day });
        this.store.dispatch(datepickerNextActions.changeCalendarSelected, { year, month, day });
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, { year, month, day });
    }

}

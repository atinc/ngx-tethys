import { Store, Action } from '../store';
import {
    DatepickerNextCalendarViewModeEnum,
    ThyDatepickerNextCalendarDate,
    DatepickerNextValueChangeTypeEnum,
    ThyDatepickerNextTimeInfo
} from './datepicker-next.interface';
import { calendarDateConvert } from './util';


export class DatepickerNextState {
    calendarViewMode: DatepickerNextCalendarViewModeEnum;
    calendarViewModeComponent: any;
    calendarNavigation: {
        text: string
    };
    calendarCurrent: ThyDatepickerNextCalendarDate;
    calendarSelected: ThyDatepickerNextCalendarDate;
    timeSelected: ThyDatepickerNextTimeInfo;
    valueChange: any;
}

export const datepickerNextActions = {
    init: 'init',
    initCalendarView: 'initCalendarView',
    changeCalendarViewMode: 'changeCalendarViewMode',
    changeCalendarCurrent: 'changeCalendarCurrent',
    changeCalendarSelected: 'changeCalendarSelected',
    changeTimeSelected: 'changeTimeSelected',
    valueChange: 'valueChange',
};

export class ThyDatepickerNextStore extends Store<DatepickerNextState> {

    static calendarViewMode(state: DatepickerNextState) {
        return state.calendarViewMode;
    }

    static calendarCurrent(state: DatepickerNextState) {
        return state.calendarCurrent;
    }

    static calendarSelected(state: DatepickerNextState) {
        return state.calendarSelected;
    }

    static timeSelected(state: DatepickerNextState) {
        return state.timeSelected;
    }

    static calendarCurrentYear(state: DatepickerNextState) {
        return state.calendarCurrent.year;
    }

    static valueChange(state: DatepickerNextState) {
        return state.valueChange;
    }

    constructor() {
        super(new DatepickerNextState());
    }

    clear() {
        this.next(new DatepickerNextState());
    }

    @Action(datepickerNextActions.initCalendarView)
    initCalendarView(state: DatepickerNextState, payload: { calendarDate: ThyDatepickerNextCalendarDate }): void {
        let year, month, day;
        if (payload && payload.calendarDate) {
            year = payload.calendarDate.year;
            month = payload.calendarDate.month;
            day = payload.calendarDate.day;
        } else {
            const today = new Date();
            year = today.getFullYear();
            month = today.getMonth();
            day = today.getDate();
        }

        this.dispatch(datepickerNextActions.changeCalendarSelected, {
            year,
            month,
            day,
        });
        this.dispatch(datepickerNextActions.changeCalendarCurrent, {
            year,
            month,
            day: 1,
            viewMode: DatepickerNextCalendarViewModeEnum.day,
        });
    }

    @Action(datepickerNextActions.changeCalendarSelected)
    changeCalendarSelected(state: DatepickerNextState, payload: ThyDatepickerNextCalendarDate): void {
        const result = state.calendarSelected || {};
        if (payload.year !== undefined) {
            result.year = payload.year;
        }
        if (payload.month !== undefined) {
            result.month = payload.month;
        }
        if (payload.day !== undefined) {
            result.day = payload.day;
        }
        state.calendarSelected = calendarDateConvert(result.year, result.month, result.day);
        this.next(state);
    }

    @Action(datepickerNextActions.changeCalendarViewMode)
    changeCalendarViewMode(state: DatepickerNextState, payload: { viewMode: DatepickerNextCalendarViewModeEnum }): void {
        state.calendarViewMode = payload.viewMode;
        this.next(state);
    }

    @Action(datepickerNextActions.changeCalendarCurrent)
    changeCalendarCurrent(state: DatepickerNextState, payload: {
        year: number,
        month: number,
        day: number,
        viewMode: DatepickerNextCalendarViewModeEnum
    }): void {
        if (state.calendarCurrent) {
            if (payload.year !== undefined) {
                state.calendarCurrent.year = payload.year;
            }
            if (payload.month !== undefined) {
                const date = calendarDateConvert(state.calendarCurrent.year, payload.month);
                state.calendarCurrent.year = date.year;
                state.calendarCurrent.month = date.month;
            }
            if (payload.day !== undefined) {
                const date = calendarDateConvert(state.calendarCurrent.year, state.calendarCurrent.month, payload.day);
                state.calendarCurrent.year = date.year;
                state.calendarCurrent.month = date.month;
                state.calendarCurrent.day = date.day;
            }
        } else {
            state.calendarCurrent = {
                year: payload.year,
                month: payload.month,
                day: payload.day,
            };
        }
        state.calendarCurrent = Object.assign({}, state.calendarCurrent);

        if (payload.viewMode) {
            state.calendarViewMode = payload.viewMode;
        }

        this.next(state);
    }

    @Action(datepickerNextActions.valueChange)
    valueChange(state: DatepickerNextState, payload: { type: DatepickerNextValueChangeTypeEnum }): void {
        state.valueChange = payload.type;
        this.next(state);
    }

    @Action(datepickerNextActions.changeTimeSelected)
    changeTimeSelected(state: DatepickerNextState, payload: ThyDatepickerNextTimeInfo): void {
        state.timeSelected = {
            hour: payload.hour,
            minute: payload.minute,
        };
        this.next(state);
    }

}

import { Injectable } from '@angular/core';
import { MiniAction, MiniStore } from 'ngx-tethys/core';
import { TinyDate } from 'ngx-tethys/util';
import { canChangeHours, canChangeMinutes, canChangeSeconds, canChangeValue, timePickerControls } from '../time-picker-controls.util';
import { changeTime, isValidLimit, setTime } from '../time-picker.utils';
import { Time, TimeChangeEvent, TimePickerComponentState, TimePickerControls } from './inner-time-picker.class';
import { TimePickerConfig } from './inner-time-picker.config';

export interface TimePickerState {
    value: Date;
    config: TimePickerComponentState;
    controls: TimePickerControls;
}

export const initialState: TimePickerState = {
    value: null,
    config: new TimePickerConfig(),
    controls: {
        canIncrementHours: true,
        canIncrementMinutes: true,
        canIncrementSeconds: true,

        canDecrementHours: true,
        canDecrementMinutes: true,
        canDecrementSeconds: true,

        canToggleMeridian: true
    }
};

/**
 * @internal
 */
@Injectable()
export class ThyTimePickerStore extends MiniStore<TimePickerState> {
    constructor() {
        super(initialState);
    }

    @MiniAction()
    writeValue(value: Date) {
        if (value?.getTime() !== this.snapshot.value?.getTime()) {
            this.setState({ value: value });
        }
    }

    @MiniAction()
    changeHours(event: TimeChangeEvent) {
        const state = this.snapshot;
        if (!canChangeValue(state.config, event) || !canChangeHours(event, state.controls)) {
            return state;
        }

        const _newTime = changeTime(state.value, { hour: event.step });

        if ((state.config.max || state.config.min) && !isValidLimit(state.config, _newTime)) {
            return state;
        }

        this.setState({ value: _newTime });
    }

    @MiniAction()
    changeMinutes(event: TimeChangeEvent) {
        const state = this.snapshot;
        if (!canChangeValue(state.config, event) || !canChangeMinutes(event, state.controls)) {
            return state;
        }

        const _newTime = changeTime(state.value, { minute: event.step });

        if ((state.config.max || state.config.min) && !isValidLimit(state.config, _newTime)) {
            return state;
        }

        this.setState({ value: _newTime });
    }

    @MiniAction()
    changeSeconds(event: TimeChangeEvent) {
        const state = this.snapshot;
        if (!canChangeValue(state.config, event) || !canChangeSeconds(event, state.controls)) {
            return state;
        }

        const _newTime = changeTime(state.value, {
            seconds: event.step
        });

        if ((state.config.max || state.config.min) && !isValidLimit(state.config, _newTime)) {
            return state;
        }

        this.setState({ value: _newTime });
    }

    @MiniAction()
    setTime(value: Time, tz: string) {
        const state = this.snapshot;
        if (!canChangeValue(state.config)) {
            return state;
        }

        const _newTime = setTime(state.value, value, tz);
        this.setState({ value: _newTime });
    }

    @MiniAction()
    updateControls(value: TimePickerComponentState, tz: string) {
        const state = this.snapshot;
        const _newControlsState = timePickerControls(state.value, value);
        const _newState: TimePickerState = {
            value: state.value,
            config: value,
            controls: _newControlsState
        };

        if (state.config.showMeridian !== _newState.config.showMeridian) {
            if (state.value) {
                _newState.value = new TinyDate(state.value, tz)?.nativeDate;
            }
        }

        this.setState(_newState);
    }
}

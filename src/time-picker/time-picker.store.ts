import { Store, Action } from '../store';
import { TimeChangeEvent, TimePickerComponentState, Time, TimePickerControls } from './time-picker.models';
import {
    canChangeHours,
    canChangeMinutes,
    canChangeSeconds,
    canChangeValue,
    timePickerControls
} from './time-picker-controls.util';
import { changeTime, setTime, isValidLimit } from './time-picker.utils';
import { Injectable } from '@angular/core';
import { TimePickerConfig } from './time-picker.config';

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

@Injectable()
export class ThyTimePickerStore extends Store<TimePickerState> {
    constructor() {
        super(initialState);
    }

    @Action()
    writeValue(value: Date) {
        this.setState({ value: value });
    }

    @Action()
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

    @Action()
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

    @Action()
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

    @Action()
    setTime(value: Time) {
        const state = this.snapshot;
        if (!canChangeValue(state.config)) {
            return state;
        }

        const _newTime = setTime(state.value, value);
        this.setState({ value: _newTime });
    }

    @Action()
    updateControls(value: TimePickerComponentState) {
        const state = this.snapshot;
        const _newControlsState = timePickerControls(state.value, value);
        const _newState: TimePickerState = {
            value: state.value,
            config: value,
            controls: _newControlsState
        };

        if (state.config.showMeridian !== _newState.config.showMeridian) {
            if (state.value) {
                _newState.value = new Date(state.value);
            }
        }

        this.setState(_newState);
    }
}

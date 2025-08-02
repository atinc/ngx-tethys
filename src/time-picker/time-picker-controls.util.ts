import { TimeChangeEvent, TimePickerComponentState, TimePickerControls } from './inner/inner-time-picker.class';
import { changeTime } from './time-picker.utils';

export function canChangeValue(state: TimePickerComponentState, event?: TimeChangeEvent): boolean {
    const mousewheel = state.mousewheel();
    const arrowKeys = state.arrowKeys();
    const readonlyInput = state.readonlyInput();
    const disabled = state.disabled();

    if (readonlyInput || disabled) {
        return false;
    }

    if (event) {
        if (event.source === 'wheel' && !mousewheel) {
            return false;
        }

        if (event.source === 'key' && !arrowKeys) {
            return false;
        }
    }

    return true;
}

export function canChangeHours(event: TimeChangeEvent, controls: TimePickerControls): boolean {
    if (!event.step) {
        return false;
    }

    if (event.step > 0 && !controls.canIncrementHours) {
        return false;
    }

    if (event.step < 0 && !controls.canDecrementHours) {
        return false;
    }

    return true;
}

export function canChangeMinutes(event: TimeChangeEvent, controls: TimePickerControls): boolean {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementMinutes) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementMinutes) {
        return false;
    }

    return true;
}

export function canChangeSeconds(event: TimeChangeEvent, controls: TimePickerControls): boolean {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementSeconds) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementSeconds) {
        return false;
    }

    return true;
}

export function getControlsValue(state: TimePickerComponentState): TimePickerComponentState {
    const {
        hourStep,
        minuteStep,
        secondsStep,
        readonlyInput,
        disabled,
        mousewheel,
        arrowKeys,
        showSpinners,
        showMeridian,
        showSeconds,
        meridians,
        min,
        max
    } = state;

    return {
        hourStep,
        minuteStep,
        secondsStep,
        readonlyInput,
        disabled,
        mousewheel,
        arrowKeys,
        showSpinners,
        showMeridian,
        showSeconds,
        meridians,
        min,
        max
    };
}

export function timePickerControls(value: Date, state: TimePickerComponentState): TimePickerControls {
    const hoursPerDayHalf = 12;
    const min = state.min();
    const max = state.max();
    const hourStep = state.hourStep();
    const minuteStep = state.minuteStep();
    const secondsStep = state.secondsStep();
    const showSeconds = state.showSeconds();

    const res: TimePickerControls = {
        canIncrementHours: true,
        canIncrementMinutes: true,
        canIncrementSeconds: true,

        canDecrementHours: true,
        canDecrementMinutes: true,
        canDecrementSeconds: true,

        canToggleMeridian: true
    };

    if (!value) {
        return res;
    }

    // compare dates
    if (max) {
        const _newHour = changeTime(value, { hour: hourStep });
        res.canIncrementHours = max > _newHour;

        if (!res.canIncrementHours) {
            const _newMinutes = changeTime(value, { minute: minuteStep });
            res.canIncrementMinutes = showSeconds ? max > _newMinutes : max >= _newMinutes;
        }

        if (!res.canIncrementMinutes) {
            const _newSeconds = changeTime(value, { seconds: secondsStep });
            res.canIncrementSeconds = max >= _newSeconds;
        }

        if (value.getHours() < hoursPerDayHalf) {
            res.canToggleMeridian = changeTime(value, { hour: hoursPerDayHalf }) < max;
        }
    }

    if (min) {
        const _newHour = changeTime(value, { hour: -hourStep });
        res.canDecrementHours = min < _newHour;

        if (!res.canDecrementHours) {
            const _newMinutes = changeTime(value, { minute: -minuteStep });
            res.canDecrementMinutes = showSeconds ? min < _newMinutes : min <= _newMinutes;
        }

        if (!res.canDecrementMinutes) {
            const _newSeconds = changeTime(value, { seconds: -secondsStep });
            res.canDecrementSeconds = min <= _newSeconds;
        }

        if (value.getHours() >= hoursPerDayHalf) {
            res.canToggleMeridian = changeTime(value, { hour: -hoursPerDayHalf }) > min;
        }
    }

    return res;
}

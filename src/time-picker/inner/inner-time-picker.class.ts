import { InputSignal } from '@angular/core';

export interface Time {
    hour?: string | number;
    minute?: string | number;
    seconds?: string | number;
    isPM?: boolean;
}

export interface TimePickerControls {
    canIncrementHours: boolean;
    canIncrementMinutes: boolean;
    canIncrementSeconds: boolean;

    canDecrementHours: boolean;
    canDecrementMinutes: boolean;
    canDecrementSeconds: boolean;

    canToggleMeridian: boolean;
}

export interface TimePickerComponentState {
    min: InputSignal<Date>;
    max: InputSignal<Date>;

    hourStep: InputSignal<number>;
    minuteStep: InputSignal<number>;
    secondsStep: InputSignal<number>;

    readonlyInput: InputSignal<boolean>;
    disabled: InputSignal<boolean>;

    mousewheel: InputSignal<boolean>;
    arrowKeys: InputSignal<boolean>;

    showSpinners: InputSignal<boolean>;
    showMeridian: InputSignal<boolean>;
    showSeconds: InputSignal<boolean>;
    showMinutes?: InputSignal<boolean>;

    meridians: InputSignal<string[]>;
}

export type TimeChangeSource = 'wheel' | 'key' | '';

export interface TimeChangeEvent {
    step: number;
    source: TimeChangeSource;
}

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
    min: Date;
    max: Date;

    hourStep: number;
    minuteStep: number;
    secondsStep: number;

    readonlyInput: boolean;
    disabled: boolean;

    mousewheel: boolean;
    arrowKeys: boolean;

    showSpinners: boolean;
    showMeridian: boolean;
    showSeconds: boolean;

    meridians: string[];
}

export type TimeChangeSource = 'wheel' | 'key' | '';

export interface TimeChangeEvent {
    step: number;
    source: TimeChangeSource;
}

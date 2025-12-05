import { Injectable } from '@angular/core';

/**
 * @internal
 */
@Injectable()
export class TimePickerConfig {
    /** hours change step */
    hourStep = 1;
    /** hours change step */
    minuteStep = 5;
    /** seconds changes step */
    secondsStep = 10;
    /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
    showMeridian = true;
    /** meridian labels based on locale */
    meridians = ['AM', 'PM'];
    /** if true hours and minutes fields will be readonly */
    readonlyInput = false;
    /** if true hours and minutes fields will be disabled */
    disabled = false;
    /** if true scroll inside hours and minutes inputs will change time */
    mousewheel = true;
    /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
    arrowKeys = true;
    /** if true spinner arrows above and below the inputs will be shown */
    showSpinners = true;
    /** show seconds in timePicker */
    showSeconds = false;
    /** show minutes in timePicker */
    showMinutes = true;
    /** minimum time user can select */
    min!: Date;
    /** maximum time user can select */
    max!: Date;
    /** placeholder for hours field in timePicker */
    hoursPlaceholder = 'HH';
    /** placeholder for minutes field in timePicker */
    minutesPlaceholder = 'MM';
    /** placeholder for seconds field in timePicker */
    secondsPlaceholder = 'SS';
}

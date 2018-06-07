import { Injectable } from '@angular/core';
import { ThyDatepickerConfig } from './datepicker.config';


/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
@Injectable()
export class ThyDaterangepickerConfig extends ThyDatepickerConfig {
  displayMonths = 2;
}

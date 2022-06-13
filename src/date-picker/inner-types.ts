import { TinyDate } from 'ngx-tethys/util';
import { ThyDateGranularity } from './standard-types';

export type CompatibleValue = TinyDate[] | TinyDate;

export type RangePartType = 'left' | 'right';

export type DatePickerFlexibleTab = 'custom' | 'advanced';

export interface AdvancedSelectableCell {
    type: ThyDateGranularity;
    content?: string;
    startValue?: TinyDate;
    endValue?: TinyDate;
    isInRange?: boolean;
    isOutRange?: boolean;
    classMap?: object;
}

export interface RangeAdvancedValue {
    dateGranularity?: ThyDateGranularity;
    begin?: TinyDate;
    end?: TinyDate;
}

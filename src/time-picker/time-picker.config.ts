import { InjectionToken } from '@angular/core';

export interface ThyTimePickerConfig {
    /**
     * 是否开启自适应位置
     */
    flexiblePosition?: boolean;
}

export const THY_TIME_PICKER_CONFIG = new InjectionToken<ThyTimePickerConfig>('thy-time-picker-config');
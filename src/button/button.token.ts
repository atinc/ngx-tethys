import { InjectionToken, InputSignal, InputSignalWithTransform } from '@angular/core';
import type { ThyButtonSize } from './button.component';

export interface IThyButtonGroup {
    thySize: InputSignalWithTransform<ThyButtonSize, ThyButtonSize | null | undefined>;
    thyAppearance: InputSignal<'outline' | 'fill'>;
}

export const THY_BUTTON_GROUP = new InjectionToken<IThyButtonGroup>('THY_BUTTON_GROUP');

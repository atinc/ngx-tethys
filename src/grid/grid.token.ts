import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class ThyGridToken {
    xGap!: number;
    gridItemPropValueChange$!: Subject<void>;
}

export const THY_GRID_COMPONENT = new InjectionToken<ThyGridToken>('THY_GRID_COMPONENT');

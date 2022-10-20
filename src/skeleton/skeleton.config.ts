import { InjectionToken } from '@angular/core';
export interface ThySkeletonConfigModel {
    thyAnimatedInterval?: string | number;
    thyPrimaryColor?: string;
    thySecondaryColor?: string;
    thyAnimated?: boolean;
}

export const THY_SKELETON_CONFIG = new InjectionToken<ThySkeletonConfigModel>('THY_SKELETON_CONFIG', {
    providedIn: 'root',
    factory: () => {
        return {};
    }
});

import { InjectionToken } from '@angular/core';

export interface ThySkeletonConfigModel {
    thyAnimatedInterval?: string | number;
    thyPrimaryColor?: string;
    thySecondaryColor?: string;
    thyAnimated?: boolean;
    thyListConfig?: {
        thyRowWidth?: string;
        thyRowHeight?: string;
        thyBorderRadius?: string | number;
        thyRowsCount?: string | number;
    };
    thyBulletListConfig?: {
        thySize: string | number;
        thyRowWidth?: string;
        thyRowHeight?: string;
        thyBorderRadius?: string | number;
        thyRowsCount?: string | number;
    };
    thyParagraphConfig?: {
        thyFirstWidth: string | number;
        thyLastWidth: string | number;
        thyRowWidth?: string;
        thyRowHeight?: string;
        thyBorderRadius?: string | number;
        thyRowsCount?: string | number;
    };
}

export const SkeletonDefaultConfig: ThySkeletonConfigModel = {
    thyAnimatedInterval: 1.5,
    thyPrimaryColor: '#F7F7F7',
    thySecondaryColor: '#eeeeee',
    thyAnimated: false,
    thyListConfig: {
        thyRowWidth: '100%',
        thyRowHeight: '20px',
        thyBorderRadius: 4,
        thyRowsCount: 4
    },
    thyBulletListConfig: {
        thySize: 20,
        thyRowWidth: '80%',
        thyRowHeight: '20px',
        thyBorderRadius: '4px',
        thyRowsCount: 5
    },
    thyParagraphConfig: {
        thyFirstWidth: '33%',
        thyLastWidth: '66%',
        thyRowWidth: '100%',
        thyRowHeight: '20px',
        thyBorderRadius: '4',
        thyRowsCount: 4
    }
};

export const THY_SKELETON_CONFIG = new InjectionToken<ThySkeletonConfigModel>('THY_SKELETON_CONFIG', {
    providedIn: 'root',
    factory: () => {
        return {};
    }
});

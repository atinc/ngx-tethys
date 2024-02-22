import { InjectionToken } from '@angular/core';
import { ThySegmentItem } from './segment-item.component';

export interface IThySegmentComponent {
    thyMode: string;
    thyDisabled: boolean;
    selectedItem: ThySegmentItem;
    changeSelectedItem: (item: ThySegmentItem, event?: Event) => void;
}

export const THY_SEGMENTED_COMPONENT = new InjectionToken<IThySegmentComponent>('THY_SEGMENTED_COMPONENT');

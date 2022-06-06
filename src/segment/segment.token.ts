import { InjectionToken } from '@angular/core';
import { ThySegmentItemComponent } from './segment-item.component';

export interface IThySegmentComponent {
    thyMode: string;
    thyDisabled: boolean;
    selectedItem: ThySegmentItemComponent;
    changeSelectedItem: (event: Event, item: ThySegmentItemComponent) => void;
}

export const THY_SEGMENTED_COMPONENT = new InjectionToken<IThySegmentComponent>('THY_SEGMENTED_COMPONENT');

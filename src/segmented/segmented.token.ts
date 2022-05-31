import { InjectionToken } from '@angular/core';
import { ThySegmentedItemComponent } from './segmented-item.component';

export interface IThySegmentedComponent {
    thyMode: string;
    thyDisabled: boolean;
    selectedItem: ThySegmentedItemComponent;
    changeSelectedItem: (event: Event, item: ThySegmentedItemComponent) => void;
}

export const THY_SEGMENTED_COMPONENT = new InjectionToken<IThySegmentedComponent>('THY_SEGMENTED_COMPONENT');

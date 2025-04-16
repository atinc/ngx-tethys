import { ElementRef, InjectionToken } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

export interface IThySegmentItemComponent {
    elementRef: ElementRef<HTMLElement>;
    thyValue: SafeAny;
    unselect: () => void;
    select: () => void;
}

export interface IThySegmentComponent {
    thyMode: string;
    thyDisabled: boolean;
    selectedItem: IThySegmentItemComponent;
    changeSelectedItem: (item: IThySegmentItemComponent, event?: Event) => void;
}

export const THY_SEGMENTED_COMPONENT = new InjectionToken<IThySegmentComponent>('THY_SEGMENTED_COMPONENT');

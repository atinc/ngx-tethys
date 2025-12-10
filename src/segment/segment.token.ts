import { ElementRef, InjectionToken, InputSignal, InputSignalWithTransform } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { ThyBooleanInput } from 'ngx-tethys/util';

export interface IThySegmentItemComponent {
    elementRef: ElementRef<HTMLElement>;
    thyValue: SafeAny;
    unselect: () => void;
    select: () => void;
}

export interface IThySegmentComponent {
    thyMode: InputSignal<string>;
    thyDisabled: InputSignalWithTransform<boolean, ThyBooleanInput> | InputSignal<boolean>;
    selectedItem: IThySegmentItemComponent | null;
    changeSelectedItem: (item: IThySegmentItemComponent, event?: Event) => void;
}

export const THY_SEGMENTED_COMPONENT = new InjectionToken<IThySegmentComponent>('THY_SEGMENTED_COMPONENT');

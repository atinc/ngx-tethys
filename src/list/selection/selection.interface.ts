import { ThyListOption, IThyListOptionParentComponent } from 'ngx-tethys/shared';

export interface ThySelectionListChange<TValue = any> {
    source: IThyListOptionParentComponent;
    option: ThyListOption;
    value: TValue;
    event: Event;
    selected: boolean;
}

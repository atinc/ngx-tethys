import { ThySelectionList } from './selection-list';
import { ThyListOption } from 'ngx-tethys/shared';

export interface ThySelectionListChange<TValue = any> {
    source: ThySelectionList;
    option: ThyListOption;
    value: TValue;
    event: Event;
    selected: boolean;
}

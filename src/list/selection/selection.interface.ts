import { ThySelectionListComponent } from './selection-list';
import { ThyListOptionComponent } from '../../core/option/module';

export interface ThySelectionListChange {
    source: ThySelectionListComponent;
    option: ThyListOptionComponent;
    value: any;
    event: Event;
    selected: boolean;
}

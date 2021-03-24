import { ComponentTagChangeBase } from '../../../class';

export class ComponentTagChangeMigrationByNg11 extends ComponentTagChangeBase {
    readonly relation = {
        'thy-grid': 'thy-table',
        'thy-grid-column': 'thy-table-column'
    };
}

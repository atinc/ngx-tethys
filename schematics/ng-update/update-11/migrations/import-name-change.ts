import { ImportNameChangeBase } from '../../../class';

export class ImportNameChangeMigrationByNg11 extends ImportNameChangeBase {
    readonly relation = {
        ThyGridModule: 'ThyTableModule'
    };
}

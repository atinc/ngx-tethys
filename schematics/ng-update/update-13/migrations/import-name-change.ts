import { ImportNameChangeBase } from '../../../class';

const IMPORT_NAME_CHANGE_RELATION = {
    ThyRasterModule: 'ThyGridModule'
};

export class ImportNameChangeMigrationByNg13 extends ImportNameChangeBase {
    readonly relation = IMPORT_NAME_CHANGE_RELATION;
}

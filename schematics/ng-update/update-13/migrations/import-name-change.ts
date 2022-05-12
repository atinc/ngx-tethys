import { ImportNameChangeBase } from '../../../class';

export const IMPORT_NAME_CHANGE_RELATION = {
    ThyRasterModule: 'ThyGridModule'
};

export class ImportNameChangeMigrationByNg12 extends ImportNameChangeBase {
    readonly relation = IMPORT_NAME_CHANGE_RELATION;
}

import { ImportEntryPointClassifyMigrationBase } from '../../../class';
import { namePackageRelationsInNg13 } from './name-package-relation';

export class ImportEntryPointClassifyMigrationByNg13 extends ImportEntryPointClassifyMigrationBase {
    readonly specifyGroup = {
        helpers: 'util',
        dom: 'util',
        keycodes: 'util',
        references: 'util',
        NgxTethysModule: ''
    };

    readonly relation = Object.assign({}, namePackageRelationsInNg13, this.specifyGroup);
}

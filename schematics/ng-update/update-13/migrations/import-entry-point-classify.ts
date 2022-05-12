import { ImportEntryPointClassifyMigrationBase } from '../../../class';
import { namePackageRelationsInNg12 } from './name-package-relation';

export class ImportEntryPointClassifyMigrationByNg12 extends ImportEntryPointClassifyMigrationBase {
    readonly specifyGroup = {
        helpers: 'util',
        dom: 'util',
        keycodes: 'util',
        references: 'util'
    };

    readonly relation = Object.assign({}, namePackageRelationsInNg12, this.specifyGroup);
}

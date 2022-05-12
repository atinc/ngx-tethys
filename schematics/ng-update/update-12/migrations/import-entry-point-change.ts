import { ImportEntryPointChangeMigrationBase } from '../../../class';

export class ImportEntryPointChangeMigrationByNg12 extends ImportEntryPointChangeMigrationBase {
    readonly changeModulePackageGroup: { [name: string]: { with: string; replace: string } } = {};

    readonly changePackageGroup = {
        'ngx-tethys/store': '@tethys/store'
    };
}

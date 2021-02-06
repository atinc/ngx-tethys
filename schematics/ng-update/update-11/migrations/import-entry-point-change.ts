import { ImportEntryPointChangeMigrationBase } from '../../../class';

export class ImportEntryPointChangeMigrationByNg11 extends ImportEntryPointChangeMigrationBase {
    readonly changeModulePackageGroup: { [name: string]: { with: string; replace: string } } = {};

    readonly changePackageGroup = {
        'ngx-tethys/thy-grid': 'ngx-tethys/thy-table'
    };
}

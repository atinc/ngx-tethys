import { ImportEntryPointChangeMigrationBase } from '../../../class';

export class ImportEntryPointChangeMigrationByNg13 extends ImportEntryPointChangeMigrationBase {
    readonly changeModulePackageGroup: { [name: string]: { with: string; replace: string } } = {};

    readonly changePackageGroup = {
        'ngx-tethys/store': '@tethys/store',
        'ngx-tethys/raster': 'ngx-tethys/grid',
        'ngx-tethys/uploader': 'ngx-tethys/upload'
    };
}

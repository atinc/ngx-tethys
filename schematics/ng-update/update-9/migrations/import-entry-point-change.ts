import { ImportEntryPointChangeMigrationBase } from '../../../class';

export class ImportEntryPointChangeMigrationByNg9 extends ImportEntryPointChangeMigrationBase {
    readonly changeModulePackageGroup: { [name: string]: { with: string; replace: string } } = {
        Id: {
            with: 'ngx-tethys/types',
            replace: 'ngx-tethys/store'
        },
        PaginationInfo: {
            with: 'ngx-tethys/types',
            replace: 'ngx-tethys/store'
        },
        UpdateHostClassService: {
            with: 'ngx-tethys/core',
            replace: 'ngx-tethys/shared'
        }
    };

    readonly changePackageGroup = {
        'ngx-tethys/typings': 'ngx-tethys/types',
        'ngx-tethys/directives': 'ngx-tethys/shared'
    };
}

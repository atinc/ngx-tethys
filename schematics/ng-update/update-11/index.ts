import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';

import { TsMigrationSchematicsRule } from '../../class';
import { HtmlMigrationSchematicsRule } from '../../class/html-migration-schematics.rule';
import { ComponentTagChangeMigrationByNg11 } from './migrations/component-tag-change';
import { ImportEntryPointChangeMigrationByNg11 } from './migrations/import-entry-point-change';
import { ImportNameChangeMigrationByNg11, IMPORT_NAME_CHANGE_RELATION } from './migrations/import-name-change';
export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return chain([
            TsMigrationSchematicsRule([ImportEntryPointChangeMigrationByNg11, ImportNameChangeMigrationByNg11], compilerHost => {
                const oldDirectoryExists = compilerHost.directoryExists;
                compilerHost.directoryExists = (fileName: string) => {
                    if (
                        [
                            '/node_modules/ngx-tethys/table',
                            '/node_modules/ngx-tethys/grid',
                            '/node_modules/ngx-tethys',
                            '/node_modules'
                        ].includes(fileName)
                    ) {
                        return true;
                    }

                    return oldDirectoryExists.call(compilerHost, fileName);
                };
                const oldFileExists = compilerHost.fileExists;
                compilerHost.fileExists = (fileName: string) => {
                    if ([`/node_modules/ngx-tethys/table.ts`, `/node_modules/ngx-tethys/grid.ts`].includes(fileName)) {
                        return true;
                    }

                    return oldFileExists.call(compilerHost, fileName);
                };
                const oldReadDirectory = compilerHost.readDirectory;
                compilerHost.readDirectory = (fileName: string) => {
                    return oldReadDirectory.call(compilerHost, fileName);
                };
                const oldReadFile = compilerHost.readFile;
                compilerHost.readFile = fileName => {
                    if (['/node_modules/ngx-tethys/table.ts', '/node_modules/ngx-tethys/grid.ts'].includes(fileName)) {
                        return Object.keys(IMPORT_NAME_CHANGE_RELATION)
                            .map(item => `export const ${item}:'__hook${item}';export type ${item}='__hook${item}'`)
                            .join('\n');
                    }
                    return oldReadFile.call(compilerHost, fileName);
                };
                return compilerHost;
            }),
            HtmlMigrationSchematicsRule([ComponentTagChangeMigrationByNg11])
        ]);
    };
}

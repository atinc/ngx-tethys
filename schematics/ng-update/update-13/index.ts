import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';

import { TsMigrationSchematicsRule } from '../../class';
import { ImportEntryPointChangeMigrationByNg13 } from './migrations/import-entry-point-change';
import { ImportEntryPointClassifyMigrationByNg13 } from './migrations/import-entry-point-classify';
import { ImportNameChangeMigrationByNg13 } from './migrations/import-name-change';

export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return chain([
            TsMigrationSchematicsRule([
                ImportEntryPointClassifyMigrationByNg13,
                ImportNameChangeMigrationByNg13,
                ImportEntryPointChangeMigrationByNg13
            ])
        ]);
    };
}

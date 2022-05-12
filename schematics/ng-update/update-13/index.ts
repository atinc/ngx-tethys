import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';

import { TsMigrationSchematicsRule } from '../../class';
import { ImportEntryPointChangeMigrationByNg12 } from './migrations/import-entry-point-change';
import { ImportEntryPointClassifyMigrationByNg12 } from './migrations/import-entry-point-classify';
import { ImportNameChangeMigrationByNg12 } from './migrations/import-name-change';

export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return chain([
            TsMigrationSchematicsRule([
                ImportNameChangeMigrationByNg12,
                ImportEntryPointChangeMigrationByNg12,
                ImportEntryPointClassifyMigrationByNg12
            ])
        ]);
    };
}

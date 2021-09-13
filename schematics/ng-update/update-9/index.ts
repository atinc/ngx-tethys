import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { ImportEntryPointChangeMigrationByNg9 } from './migrations/import-entry-point-change';
import { ImportEntryPointTrimMigration } from './migrations/import-entry-point-trim';
import { ImportEntryPointClassifyMigrationByNg9 } from './migrations/import-entry-point-classify';
import { TsMigrationSchematicsRule } from '../../class';

export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return TsMigrationSchematicsRule([
            ImportEntryPointTrimMigration,
            ImportEntryPointChangeMigrationByNg9,
            ImportEntryPointClassifyMigrationByNg9
        ]);
    };
}

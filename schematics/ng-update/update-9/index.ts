import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { ImportEntryPointChangeMigrationByNg9 } from './migrations/import-entry-point-change';
import { ImportEntryPointTrimMigration } from './migrations/import-entry-point-trim';
import { ImportEntryPointClassifyMigration } from './migrations/import-entry-point-classify';
import { MigrationSchematicsRule } from '../../class';

export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return MigrationSchematicsRule([
            ImportEntryPointTrimMigration,
            ImportEntryPointChangeMigrationByNg9,
            ImportEntryPointClassifyMigration
        ]);
    };
}

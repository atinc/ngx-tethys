import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';

import { TsMigrationSchematicsRule } from '../../class';
import { HtmlMigrationSchematicsRule } from '../../class/html-migration-schematics.rule';
import { ComponentTagChangeMigrationByNg11 } from './migrations/component-tag-change';
import { ImportEntryPointChangeMigrationByNg11 } from './migrations/import-entry-point-change';
import { ImportNameChangeMigrationByNg11 } from './migrations/import-name-change';
export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return chain([
            TsMigrationSchematicsRule([ImportEntryPointChangeMigrationByNg11, ImportNameChangeMigrationByNg11]),
            HtmlMigrationSchematicsRule([ComponentTagChangeMigrationByNg11])
        ]);
    };
}

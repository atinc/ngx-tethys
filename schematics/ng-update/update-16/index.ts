import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { TethysTargetVersion } from '../core/target-version';
import { ruleUpgradeData } from '../data';
import { AfterInsertElementMigration } from '../migrations/after-insert-element';
import { BeforeInsertElementMigration } from '../migrations/before-insert-element';
import { ClassNamesMigration } from '../migrations/class-names';
import { EntryPointsMigration } from '../migrations/entry-points';
import { InputNamesRemovalMigration } from '../migrations/input-names-removal';
import { InputValuesMigration } from '../migrations/input-values';
import { OutputNamesRemovalMigration } from '../migrations/output-names-removal';

const migrations: NullableDevkitMigration[] = [
    InputNamesRemovalMigration,
    OutputNamesRemovalMigration,
    InputValuesMigration,
    BeforeInsertElementMigration,
    AfterInsertElementMigration,
    ClassNamesMigration,
    EntryPointsMigration
];

export default function main(): Rule {
    return createMigrationSchematicRule(TethysTargetVersion.V16, migrations, ruleUpgradeData, onMigrationComplete);
}

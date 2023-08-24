import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onV16MigrationComplete } from '../core/complete';
import { ruleUpgradeData } from '../data';
import { AfterInsertElementMigration } from '../migrations/after-insert-element';
import { BeforeInsertElementMigration } from '../migrations/before-insert-element';
import { ActionMenuRemovalRule } from '../migrations/checks/action-menu-removal-rule';
import { LabelRemovalRule } from '../migrations/checks/label-removal-rule';
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
    EntryPointsMigration,
    ActionMenuRemovalRule,
    LabelRemovalRule
];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V16, migrations, ruleUpgradeData, onV16MigrationComplete);
}

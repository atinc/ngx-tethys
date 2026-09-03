import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { ClassNamesMigration } from './class-name-migration';
import { onMigrationComplete } from '../core/complete';
import { InputControlSizeMigration } from './input-control-size-migration';
import { TableShowHeaderMigration } from './table-show-header-migration';
import { TagAppearanceMigration } from './tag-appearance-migration';
import { DividerDeeperMigration } from './divider-deeper-migration';
import { BadgeDotHollowMigration } from './badge-dot-hollow-migration';
import { NavInsideClosableMigration } from './nav-inside-closable-migration';
import { upgradeData } from './update-data';

const migrations: NullableDevkitMigration[] = [
    InputControlSizeMigration,
    NavInsideClosableMigration,
    TableShowHeaderMigration,
    TagAppearanceMigration,
    DividerDeeperMigration,
    BadgeDotHollowMigration,
    ClassNamesMigration
];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V22, migrations, upgradeData, onMigrationComplete);
}

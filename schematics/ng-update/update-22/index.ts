import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { ButtonAppearanceMigration } from './button-appearance-migration';
import { ClassNamesMigration } from './class-name-migration';
import { DividerDeeperMigration } from './divider-deeper-migration';
import { HeaderIconPrefixMigration } from './header-icon-prefix-migration';
import { InputControlSizeMigration } from './input-control-size-migration';
import { NavInsideClosableMigration } from './nav-inside-closable-migration';
import { TableShowHeaderMigration } from './table-show-header-migration';
import { TagAppearanceMigration } from './tag-appearance-migration';
import { upgradeData } from './update-data';

const migrations: NullableDevkitMigration[] = [
    InputControlSizeMigration,
    NavInsideClosableMigration,
    TableShowHeaderMigration,
    TagAppearanceMigration,
    DividerDeeperMigration,
    ButtonAppearanceMigration,
    ClassNamesMigration,
    HeaderIconPrefixMigration
];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V22, migrations, upgradeData, onMigrationComplete);
}

import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { BadgeDotHollowMigration } from './badge-dot-hollow-migration';
import { ButtonAppearanceMigration } from './button-appearance-migration';
import { CardDeprecatedPropsMigration } from './card-deprecated-props-migration';
import { ClassNamesMigration } from './class-name-migration';
import { DatePickerPopoverOptionsMigration } from './date-picker-popover-options-migration';
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
    DatePickerPopoverOptionsMigration,
    TableShowHeaderMigration,
    TagAppearanceMigration,
    DividerDeeperMigration,
    ButtonAppearanceMigration,
    CardDeprecatedPropsMigration,
    BadgeDotHollowMigration,
    ClassNamesMigration,
    HeaderIconPrefixMigration
];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V22, migrations, upgradeData, onMigrationComplete);
}

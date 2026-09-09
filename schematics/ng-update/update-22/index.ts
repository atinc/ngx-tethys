import { Rule } from '@angular-devkit/schematics';
import { NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { createTwoPhaseMigrationSchematicRule } from '../two-phase-migration-rule';
import { BadgeDotHollowMigration } from './badge-dot-hollow-migration';
import { ButtonAppearanceMigration } from './button-appearance-migration';
import { CardDeprecatedPropsMigration } from './card-deprecated-props-migration';
import { ClassNamesMigration } from './class-name-migration';
import { FormControlSizeTypeMigration } from './form-control-size-type-migration';
import { DatePickerPopoverOptionsMigration } from './date-picker-popover-options-migration';
import { DividerDeeperMigration } from './divider-deeper-migration';
import { HeaderIconPrefixMigration } from './header-icon-prefix-migration';
import { InputControlSizeMigration } from './input-control-size-migration';
import { NavInsideClosableMigration } from './nav-inside-closable-migration';
import { TableShowHeaderMigration } from './table-show-header-migration';
import { TagAppearanceMigration } from './tag-appearance-migration';
import { TreeSelectIconTypeMigration } from './tree-select-icon-type-migration';
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
    FormControlSizeTypeMigration,
    HeaderIconPrefixMigration,
    TreeSelectIconTypeMigration
];

export function createMigrate22Rule(onComplete: typeof onMigrationComplete = onMigrationComplete): Rule {
    return createTwoPhaseMigrationSchematicRule(TargetVersion.V22, migrations, upgradeData, onComplete);
}

export default function main(): Rule {
    return createMigrate22Rule();
}

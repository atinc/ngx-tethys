import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { ClassNamesMigration } from './class-name-migration';
import { onMigrationComplete } from '../core/complete';
import { InputControlSizeMigration } from './input-control-size-migration';
import { TagAppearanceMigration } from './tag-appearance-migration';
import { upgradeData } from './update-data';

const migrations: NullableDevkitMigration[] = [InputControlSizeMigration, TagAppearanceMigration, ClassNamesMigration];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V22, migrations, upgradeData, onMigrationComplete);
}

import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { InputControlSizeMigration } from './input-control-size-migration';
import { upgradeData } from './update-data';

const migrations: NullableDevkitMigration[] = [InputControlSizeMigration];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V22, migrations, upgradeData, onMigrationComplete);
}

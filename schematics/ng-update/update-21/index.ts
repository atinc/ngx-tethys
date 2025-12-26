import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { upgradeData } from './update-data';

const migrations: NullableDevkitMigration[] = [];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V21, migrations, upgradeData, onMigrationComplete);
}

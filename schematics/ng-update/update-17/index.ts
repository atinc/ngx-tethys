import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { upgradeData } from './update-data';
import { ClassNamesMigration } from './class-name-migration';

const migrations: NullableDevkitMigration[] = [ClassNamesMigration];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V17, migrations, upgradeData, onMigrationComplete);
}

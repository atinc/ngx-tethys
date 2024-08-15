import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onV18MigrationComplete } from './complete';
import { upgradeData } from './update-data';
import { ClassNamesMigration } from './class-name-migration';

const migrations: NullableDevkitMigration[] = [ClassNamesMigration];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V18, migrations, upgradeData, onV18MigrationComplete);
}

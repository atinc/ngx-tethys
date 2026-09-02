import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onMigrationComplete } from '../core/complete';
import { ClassNamesMigration } from './class-name-migration';
import { TagAppearanceMigration } from './tag-appearance-migration';
import { upgradeData } from './update-data';

const migrations: NullableDevkitMigration[] = [ClassNamesMigration, TagAppearanceMigration];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V22, migrations, upgradeData, onMigrationComplete);
}

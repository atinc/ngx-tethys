import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { onV17MigrationComplete } from '../core/complete';
import { ruleUpgradeData } from '../data';

const migrations: NullableDevkitMigration[] = [];

export default function main(): Rule {
    return createMigrationSchematicRule(TargetVersion.V17, migrations, ruleUpgradeData, onV17MigrationComplete);
}

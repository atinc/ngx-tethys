import { Rule } from '@angular-devkit/schematics';
import { onStandaloneMigrationComplete } from '../ng-update/core/complete';
import { createMigrate22Rule } from '../ng-update/update-22';

export function main(): Rule {
    return createMigrate22Rule(onStandaloneMigrationComplete);
}

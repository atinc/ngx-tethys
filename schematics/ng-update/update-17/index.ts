import { Rule } from '@angular-devkit/schematics';
import { onMigrationComplete } from '../core/complete';
import { TargetVersion, createMigrationSchematicRule } from '@angular/cdk/schematics';

export default function main(): Rule {
    // TODO: 等 Angular 支持 v17 之后，改为 TargetVersion.V17，现在改会报错
    return createMigrationSchematicRule(TargetVersion.V16, [], null, onMigrationComplete);
}

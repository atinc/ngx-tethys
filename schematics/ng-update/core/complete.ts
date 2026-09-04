import { SchematicContext } from '@angular-devkit/schematics';
import { TargetVersion } from '@angular/cdk/schematics';

function logMigrationComplete(context: SchematicContext, message: string, hasFailures: boolean) {
    context.logger.info('');
    context.logger.info(`  ✓  ${message}`);
    context.logger.info('');

    if (hasFailures) {
        context.logger.warn(
            '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
                'output above and fix these issues manually.'
        );
    }
}

export function onMigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean) {
    logMigrationComplete(context, `Updated NGX-TETHYS to ${targetVersion}`, hasFailures);
}

export function onStandaloneMigrationComplete(context: SchematicContext, _targetVersion: TargetVersion, hasFailures: boolean) {
    logMigrationComplete(context, 'Completed NGX-TETHYS v22 code migration', hasFailures);
}

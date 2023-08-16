import { SchematicContext } from '@angular-devkit/schematics';
import { TargetVersion } from '@angular/cdk/schematics';

export function onMigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean) {
    context.logger.info('');
    context.logger.info(`  ✓  Updated NGX-TETHYS to ${targetVersion}`);
    context.logger.info('');

    if (hasFailures) {
        context.logger.warn(
            '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
                'output above and fix these issues manually.'
        );
    }
}

export function onV16MigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean) {
    context.logger.info('');
    context.logger.info(`  ✓  Updated NGX-TETHYS to ${targetVersion}`);
    context.logger.info(`  ✓  Replaced label with tag`);
    context.logger.info(`  ✓  Replaced action-menu with dropdown-menu`);
    context.logger.info('');

    if (hasFailures) {
        context.logger.warn(
            '  ⚠  Some issues were detected but could not be fixed automatically. Please check the replace input with variable value in template and fix these issues manually. Check against documentation please.'
        );
    }
}

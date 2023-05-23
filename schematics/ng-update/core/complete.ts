import { SchematicContext } from '@angular-devkit/schematics';
import { TethysTargetVersion } from './target-version';

export function onMigrationComplete(context: SchematicContext, targetVersion: TethysTargetVersion, hasFailures: boolean) {
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

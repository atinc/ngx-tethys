import { SchematicContext } from '@angular-devkit/schematics';
import { TargetVersion } from '@angular/cdk/schematics';

export function onV18MigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean) {
    context.logger.info('');
    context.logger.info(`  ✓  Updated NGX-TETHYS to ${targetVersion}`);
    context.logger.info('');

    if (hasFailures) {
        context.logger.warn(
            '  ⚠  Some issues were detected but could not be fixed automatically. Please check the output above against documentation, fix these issues manually. Especially check the replace input with variable value in template, if it has a corresponding useless variable value, delete it manually. Finally prettier your code please.'
        );
        context.logger.info('');
    }
}

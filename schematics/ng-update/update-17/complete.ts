import { SchematicContext } from '@angular-devkit/schematics';
import { TargetVersion } from '@angular/cdk/schematics';

export function onV17MigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean) {
    context.logger.info('');
    context.logger.info(`  ✓  Updated NGX-TETHYS to ${targetVersion}`);
    context.logger.info('');

    if (hasFailures) {
        context.logger.warn(
            '  ⚠  Some issues were detected but could not be fixed automatically. Please check the output above against documentation, fix these issues manually. Especially check the replace input with variable value in template, if it has a corresponding useless variable value, delete it manually. Finally prettier your code please.'
        );
        context.logger.info('');
    }

    context.logger.info(
        'Tips: the four points have changes in data structure. If it is used, please modify manually according to the error prompts.'
    );
    context.logger.info('  • The input parameter `thyShortcutRanges` of RangePicker would be changed to `thyShortcutPresets`.');
    context.logger.info(
        '  • The output parameter `thyShortcutValueChange` of DatePicker and RangePicker would be changed to `thyDateChange`.'
    );
    context.logger.info('  • The interface `ThyShortcutRange` would be changed to `ThyShortcutPreset`.');
    context.logger.info('  • The interface `ThyShortcutValueChange` would be changed to `ThyDateChangeEvent`.');
    context.logger.info('');
}

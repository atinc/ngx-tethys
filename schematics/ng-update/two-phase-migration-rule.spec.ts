import { cdkMigrations } from '@angular/cdk/schematics';
import { ButtonAppearanceMigration } from './update-22/button-appearance-migration';
import { InputControlSizeMigration } from './update-22/input-control-size-migration';
import { buildTwoPhaseMigrationPlan } from './two-phase-migration-rule';

describe('two-phase migration orchestration', () => {
    it('should use CDK batch followed by all custom rules batch', () => {
        const phases = buildTwoPhaseMigrationPlan([InputControlSizeMigration, ButtonAppearanceMigration]);

        expect(phases.length).toBe(2);
        expect(phases[0].label).toBe('CDK rules');
        expect(phases[0].migrations).toEqual(cdkMigrations);
        expect(phases[1].label).toBe('Custom rules');
        expect(phases[1].migrations).toEqual([InputControlSizeMigration, ButtonAppearanceMigration]);
    });
});

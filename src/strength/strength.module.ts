import { NgModule } from '@angular/core';
import { ThyStrength } from './strength.component';

/**
 * @deprecated ThyStrengthModule will be removed in v23
 */
@NgModule({
    imports: [ThyStrength],
    exports: [ThyStrength],
    providers: []
})
export class ThyStrengthModule {}

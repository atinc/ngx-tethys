import { ThyAlertModule } from 'ngx-tethys/alert';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThyFormGroupError } from './form-group-error/form-group-error.component';
import { ThyFormGroupLabelDirective } from './form-group-label.directive';
import { ThyFormGroup } from './form-group.component';
import { ThyFormSubmitDirective } from './form-submit.directive';
import { ThyFormValidatorLoader } from './form-validator-loader';
import { ThyFormValidatorGlobalConfig, THY_FORM_CONFIG_PROVIDER, THY_VALIDATOR_CONFIG } from './form.class';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupFooter } from './from-group-footer/form-group-footer.component';
import { ThyConfirmValidatorDirective, ThyMaxDirective, ThyMinDirective, ThyUniqueCheckValidator } from './validator/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ThyInputModule,
        ThyAlertModule,
        ThyIconModule,
        ThyTooltipModule,
        ThyFormDirective,
        ThyFormGroup,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooter,
        ThyUniqueCheckValidator,
        ThyFormGroupError,
        ThyMinDirective,
        ThyMaxDirective,
        ThyConfirmValidatorDirective
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroup,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooter,
        ThyUniqueCheckValidator,
        ThyFormGroupError,
        ThyMinDirective,
        ThyMaxDirective,
        ThyConfirmValidatorDirective
    ],
    providers: [ThyFormValidatorLoader, THY_FORM_CONFIG_PROVIDER]
})
export class ThyFormModule {
    static forRoot(config: ThyFormValidatorGlobalConfig): ModuleWithProviders<ThyFormModule> {
        return {
            ngModule: ThyFormModule,
            providers: [
                {
                    provide: THY_VALIDATOR_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}

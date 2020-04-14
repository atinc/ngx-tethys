import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';
import { ThyFormGroupLabelDirective } from './form-group-label.directive';
import { ThyFormSubmitDirective } from './form-submit.directive';
import { ThyInputModule } from '../input/module';
import { ThyFormGroupFooterComponent } from './from-group-footer/form-group-footer.component';
import { ThyFormGroupErrorComponent } from './form-group-error/form-group-error.component';
import { ThyFormValidatorLoader } from './form-validator-loader';
import {
    ThyFormValidatorGlobalConfig,
    THY_VALIDATOR_CONFIG,
    THY_FORM_CONFIG,
    THY_FORM_CONFIG_PROVIDER
} from './form.class';
import { ThyUniqueCheckValidator, ThyMaxDirective, ThyMinDirective } from './validator';
import { ThyAlertModule } from '../alert/alert.module';
import { ThyIconModule } from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, FormsModule, ThyInputModule, ThyAlertModule, ThyIconModule],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooterComponent,
        ThyUniqueCheckValidator,
        ThyFormGroupErrorComponent,
        ThyMinDirective,
        ThyMaxDirective
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooterComponent,
        ThyUniqueCheckValidator,
        ThyFormGroupErrorComponent,
        ThyMinDirective,
        ThyMaxDirective
    ],
    providers: [ThyFormValidatorLoader, THY_FORM_CONFIG_PROVIDER]
})
export class ThyFormModule {
    static forRoot(config: ThyFormValidatorGlobalConfig): ModuleWithProviders {
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

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';
import { ThyFormGroupLabelDirective } from './form-group-label.directive';
import { ThyFormSubmitDirective } from './form-submit.directive';
import { ThyInputModule } from '../input/module';
import { ThyFormGroupFooterComponent } from './from-group-footer/form-group-footer.component';
import { ThyFormValidatorLoader } from './form-validator-loader';
import {
    ThyFormValidatorGlobalConfig,
    THY_VALIDATOR_CONFIG
} from './form.class';
import { ThyUniqueCheckValidator } from './validator';

@NgModule({
    imports: [CommonModule, FormsModule, ThyInputModule],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooterComponent,
        ThyUniqueCheckValidator
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooterComponent,
        ThyUniqueCheckValidator
    ],
    providers: [ThyFormValidatorLoader]
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

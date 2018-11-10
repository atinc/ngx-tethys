import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';
import { ThyFormGroupLabelDirective } from './form-group-label.directive';
import { ThyFormSubmitDirective } from './form-submit.directive';
import { ThyInputModule } from '../input/module';
import { ThyFormGroupFooterComponent } from './from-group-footer/form-group-footer.component';
import { ThyFormConfigLoader, VALIDATOR_CONFIG } from './form-config-loader';
import { ThyFormValidatorConfig } from './form.class';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule
    ],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooterComponent
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormGroupFooterComponent
    ],
    providers: [
        ThyFormConfigLoader
    ]
})
export class ThyFormModule {
    static forRoot(config: ThyFormValidatorConfig) {
        return {
            ngModule: ThyFormModule,
            providers: [
                {
                    provide: VALIDATOR_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}

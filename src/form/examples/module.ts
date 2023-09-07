import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThyRateModule } from 'ngx-tethys/rate';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyStrengthModule } from 'ngx-tethys/strength';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';
import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThySliderModule } from 'ngx-tethys/slider';

import { ThyFormBasicExampleComponent } from './basic/basic.component';
import { ThyFormColumnsExampleComponent } from './columns/columns.component';
import { ThyFormDialogExampleComponent } from './dialog/dialog.component';
import { ThyFormFullExampleComponent } from './full/full.component';
import { ThyFormLayoutExampleComponent } from './layout/layout.component';
import { ThyFormReactiveExampleComponent } from './reactive/reactive.component';
import { ThyFormValidateExampleComponent } from './validate/validate.component';
import { ThyFormValidatorsExampleComponent } from './validators/validators.component';

const COMPONENTS = [
    ThyFormBasicExampleComponent,
    ThyFormLayoutExampleComponent,
    ThyFormDialogExampleComponent,
    ThyFormValidateExampleComponent,
    ThyFormValidatorsExampleComponent,
    ThyFormColumnsExampleComponent,
    ThyFormFullExampleComponent,
    ThyFormReactiveExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ThyButtonModule,
        ThyFormModule,
        ThyDialogModule,
        ThyGridModule,
        ThyCascaderModule,
        ThyInputModule,
        ThyIconModule,
        ThyDatePickerModule,
        ThyCheckboxModule,
        ThyRadioModule,
        ThySelectModule,
        ThyNotifyModule,
        ThyInputNumberModule,
        ThyRateModule,
        ThyStrengthModule,
        ThySwitchModule,
        ThyTreeSelectModule,
        ThySliderModule,
        ThyColorPickerModule
    ],
    exports: COMPONENTS,
    providers: COMPONENTS
})
export class ThyFormExamplesModule {}

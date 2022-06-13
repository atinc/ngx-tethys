import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyNotifyModule } from 'ngx-tethys/notify';

import { ThyFormBasicExampleComponent } from './basic/basic.component';
import { ThyFormDialogExampleComponent } from './dialog/dialog.component';
import { ThyFormLayoutExampleComponent } from './layout/layout.component';
import { ThyFormValidateExampleComponent } from './validate/validate.component';
import { ThyFormFullExampleComponent } from './full/full.component';
import { ThyFormColumnsExampleComponent } from './columns/columns.component';
import { ThyFormValidatorsExampleComponent } from './validators/validators.component';

const COMPONENTS = [
    ThyFormBasicExampleComponent,
    ThyFormLayoutExampleComponent,
    ThyFormDialogExampleComponent,
    ThyFormValidateExampleComponent,
    ThyFormValidatorsExampleComponent,
    ThyFormColumnsExampleComponent,
    ThyFormFullExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
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
        ThyNotifyModule
    ],
    exports: COMPONENTS,
    providers: COMPONENTS
})
export class ThyFormExamplesModule {}

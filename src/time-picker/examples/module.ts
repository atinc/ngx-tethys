import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyTimePickerBasicExampleComponent } from './basic/basic.component';
import { ThyTimePickerDisabledExampleComponent } from './disabled/disabled.component';
import { ThyTimePickerFormatExampleComponent } from './format/format.component';
import { ThyTimePickerReadonlyExampleComponent } from './readonly/readonly.component';
import { ThyTimePickerSizeExampleComponent } from './size/size.component';
import { ThyTimePickerStepExampleComponent } from './step/step.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyTimePickerModule, ThyGridModule, ThySpaceModule, ThyButtonModule],
    declarations: [
        ThyTimePickerBasicExampleComponent,
        ThyTimePickerDisabledExampleComponent,
        ThyTimePickerReadonlyExampleComponent,
        ThyTimePickerFormatExampleComponent,
        ThyTimePickerStepExampleComponent,
        ThyTimePickerSizeExampleComponent
    ],
    exports: [ThyTimePickerBasicExampleComponent]
})
export class ThyDateRangeModule {}

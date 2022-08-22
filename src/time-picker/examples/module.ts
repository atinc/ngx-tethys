import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyTimePickerBasicExampleComponent } from './basic/basic.component';
import { ThyTimePickerDisabledExampleComponent } from './disabled/disabled.component';
import { ThyTimePickerReadonlyExampleComponent } from './readonly/readonly.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyTimePickerModule, ThyGridModule, ThySpaceModule],
    declarations: [ThyTimePickerBasicExampleComponent, ThyTimePickerDisabledExampleComponent, ThyTimePickerReadonlyExampleComponent],
    exports: [ThyTimePickerBasicExampleComponent]
})
export class ThyDateRangeModule {}

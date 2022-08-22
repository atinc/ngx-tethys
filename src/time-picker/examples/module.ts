import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyTimePickerBasicExampleComponent } from './basic/basic.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyTimePickerModule, ThyGridModule],
    declarations: [ThyTimePickerBasicExampleComponent],
    exports: [ThyTimePickerBasicExampleComponent]
})
export class ThyDateRangeModule {}

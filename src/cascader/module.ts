import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { ThyInputModule } from '../input/module';

import { ThyCascaderComponent } from './cascader.component';

@NgModule({
    imports: [ CommonModule, FormsModule, OverlayModule, ThyInputModule ],
    declarations: [
        ThyCascaderComponent
    ],
    exports: [
        ThyCascaderComponent
    ]
})
export class ThyCascaderModule {
}

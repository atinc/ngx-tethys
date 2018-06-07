import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyPropertyOperationComponent } from './property-operation.component';
import { ThyButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        ThyPropertyOperationComponent
    ],
    imports: [
        CommonModule,
        ThyButtonModule
    ],
    exports: [
        ThyPropertyOperationComponent
    ]
})
export class ThyPropertyOperationModule {

}

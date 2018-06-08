import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonModule } from '../button/button.module';
import { ThyPropertyOperationComponent } from './property-operation.component';
import { ThyPropertyOperationGroupComponent } from './property-operation-group.component';

@NgModule({
    declarations: [
        ThyPropertyOperationComponent,
        ThyPropertyOperationGroupComponent
    ],
    imports: [
        CommonModule,
        ThyButtonModule
    ],
    exports: [
        ThyPropertyOperationComponent,
        ThyPropertyOperationGroupComponent
    ]
})
export class ThyPropertyOperationModule {

}

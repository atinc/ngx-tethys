import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyConfirmComponent } from './confirm.component';
import { ThyConfirmService } from './confirm.service';

@NgModule({
    declarations: [
        ThyConfirmComponent
    ],
    entryComponents: [
        ThyConfirmComponent,
    ],
    providers: [
        ThyConfirmService,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyConfirmComponent
    ]
})
export class ThyConfirmModule {

}

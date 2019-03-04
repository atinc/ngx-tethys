import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyConfirmComponent } from './confirm.component';
import { ThyConfirmService } from './confirm.service';
import { ThyModalModule } from '../modal/modal.module';
import { ThyButtonModule } from '../button/button.module';

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
        ThyModalModule,
        ThyButtonModule,
        CommonModule,
    ],
    exports: [
        ThyConfirmComponent
    ]
})
export class ThyConfirmModule {

}

import { DemoDialogBasicComponent } from './basic/dialog-basic.component';
import { NgModule } from '@angular/core';
import { DemoDialogSectionComponent } from './dialog-section.component';
import { DemoDialogContentComponent } from './dialog-content.component';
import { SharedModule } from 'app/shared.module';
import { DemoDialogConfirmComponent } from './confirm/confirm.component';
import { DemoDialogInteractiveComponent } from './interactive/interactive.component';

@NgModule({
    declarations: [
        DemoDialogSectionComponent,
        DemoDialogBasicComponent,
        DemoDialogInteractiveComponent,
        DemoDialogConfirmComponent,
        DemoDialogContentComponent
    ],
    entryComponents: [
        DemoDialogBasicComponent,
        DemoDialogInteractiveComponent,
        DemoDialogConfirmComponent,
        DemoDialogContentComponent
    ],
    imports: [SharedModule],
    exports: [DemoDialogSectionComponent]
})
export class DialogDemoModule {}

import { ThyAlertModule } from 'ngx-tethys/alert';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyAlertBasicExampleComponent } from './basic/basic.component';
import { ThyAlertCloseExampleComponent } from './close/close.component';
import { ThyAlertIconExampleComponent } from './icon/icon.component';
import { ThyAlertMessageTemplateExampleComponent } from './message-template/message-template.component';
import { ThyAlertOperationExampleComponent } from './operation/operation.component';
import { ThyAlertWeakExampleComponent } from './weak/weak.component';

const COMPONENTS = [
    ThyAlertBasicExampleComponent,
    ThyAlertMessageTemplateExampleComponent,
    ThyAlertIconExampleComponent,
    ThyAlertWeakExampleComponent,
    ThyAlertCloseExampleComponent,
    ThyAlertOperationExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyAlertModule],
    exports: [...COMPONENTS]
})
export class ThyAlertExamplesModule {}

import { ThyAlertModule } from 'ngx-tethys/alert';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyAlertBasicExampleComponent } from './basic/basic.component';
import { ThyAlertClosableExampleComponent } from './closable/closable.component';
import { ThyAlertIconExampleComponent } from './icon/icon.component';
import { ThyAlertMessageTemplateExampleComponent } from './message-template/message-template.component';
import { ThyAlertOperationExampleComponent } from './operation/operation.component';
import { ThyAlertBorderedExampleComponent } from './bordered/bordered.component';
import { ThyAlertNakedExampleComponent } from './naked/naked.component';

const COMPONENTS = [
    ThyAlertBasicExampleComponent,
    ThyAlertMessageTemplateExampleComponent,
    ThyAlertIconExampleComponent,
    ThyAlertBorderedExampleComponent,
    ThyAlertNakedExampleComponent,
    ThyAlertClosableExampleComponent,
    ThyAlertOperationExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyAlertModule],
    exports: [...COMPONENTS]
})
export class ThyAlertExamplesModule {}

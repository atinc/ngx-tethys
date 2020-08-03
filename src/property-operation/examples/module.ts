import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyPropertyOperationGroupExampleComponent } from './group/group.component';
import { ThyPropertyOperationBasicExampleComponent } from './basic/basic.component';
import { ThyPropertyOperationDisabledExampleComponent } from './disabled/disabled.component';
import { ThyPropertyOperationShowCloseExampleComponent } from './show-close/show-close.component';

const COMPONENTS = [
    ThyPropertyOperationGroupExampleComponent,
    ThyPropertyOperationBasicExampleComponent,
    ThyPropertyOperationDisabledExampleComponent,
    ThyPropertyOperationShowCloseExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyPropertyOperationExamplesModule {}

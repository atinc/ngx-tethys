import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyPropertyOperationModule } from 'ngx-tethys/property-operation';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyPropertyOperationBasicExampleComponent } from './basic/basic.component';
import { ThyPropertyOperationDisabledExampleComponent } from './disabled/disabled.component';
import { ThyPropertyOperationGroupExampleComponent } from './group/group.component';
import { ThyPropertyOperationShowCloseExampleComponent } from './show-close/show-close.component';

const COMPONENTS = [
    ThyPropertyOperationGroupExampleComponent,
    ThyPropertyOperationBasicExampleComponent,
    ThyPropertyOperationDisabledExampleComponent,
    ThyPropertyOperationShowCloseExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyPropertyOperationModule, ThyAvatarModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyPropertyOperationExamplesModule {}

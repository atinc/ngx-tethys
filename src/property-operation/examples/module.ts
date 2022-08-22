import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyPropertyOperationModule } from 'ngx-tethys/property-operation';

import { CommonModule } from '@angular/common';

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

export default {
    imports: [CommonModule, ThyPropertyOperationModule, ThyAvatarModule, ThyButtonModule]
};

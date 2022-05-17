import { CommonModule } from '@angular/common';

import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyNotifyDetailOperationExampleComponent } from './detail-operation/detail-operation.component';

export default {
    declarations: [ThyNotifyDetailOperationExampleComponent],
    imports: [CommonModule, ThyButtonModule, ThySpaceModule, ThyNotifyModule]
};

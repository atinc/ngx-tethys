import { CommonModule } from '@angular/common';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceModule } from 'ngx-tethys/space';

export default {
    imports: [CommonModule, ThyButtonModule, ThySpaceModule, ThyNotifyModule]
};

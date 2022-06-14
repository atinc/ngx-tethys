import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyMenuModule } from 'ngx-tethys/menu';

import { CommonModule } from '@angular/common';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyGridModule } from 'ngx-tethys/grid';

export default {
    imports: [CommonModule, ThyMenuModule, ThyGridModule, ThyDividerModule, ThyIconModule, ThyActionMenuModule]
};

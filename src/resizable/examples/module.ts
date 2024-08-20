import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyResizableModule } from 'ngx-tethys/resizable';
import { ThyTableModule } from 'ngx-tethys/table';

import { CommonModule } from '@angular/common';
import { ThyDialogModule } from 'ngx-tethys/dialog';

export default {
    imports: [CommonModule, ThyResizableModule, ThyTableModule, ThyIconModule, ThyLayoutModule, ThyGridModule, ThyDialogModule]
};

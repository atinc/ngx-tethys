import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyMenuModule } from 'ngx-tethys/menu';

import { CommonModule } from '@angular/common';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyMenuModule, ThyGridModule, ThyDividerModule, ThyIconModule, ThyActionMenuModule, ThyRadioModule]
};

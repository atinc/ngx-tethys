import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyAlertModule } from 'ngx-tethys/alert';
import { ThyDividerModule } from 'ngx-tethys/divider';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export default {
    imports: [CommonModule, FormsModule, ThyNavModule, RouterModule, ThyActionMenuModule, ThyIconModule, ThyAlertModule, ThyDividerModule]
};

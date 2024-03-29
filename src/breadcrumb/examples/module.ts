import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyBreadcrumbModule, ThyIconModule, ThyDropdownModule]
};

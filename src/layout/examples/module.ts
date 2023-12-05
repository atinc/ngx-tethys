import { CommonModule } from '@angular/common';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyResizableModule } from 'ngx-tethys/resizable';

import { FormsModule } from '@angular/forms';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyLayoutModule,
        ThyButtonModule,
        ThyIconModule,
        ThyNavModule,
        ThyBreadcrumbModule,
        ThyMenuModule,
        ThyInputModule,
        ThyTooltipModule,
        ThyActionModule,
        ThyDividerModule,
        ThySpaceModule,
        ThyResizableModule
    ]
};

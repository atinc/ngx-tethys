import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyButtonModule } from 'ngx-tethys/button';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyActionMenuModule,
        ThySharedModule,
        ThySelectModule,
        ThySpaceModule,
        ThyButtonModule
    ]
};

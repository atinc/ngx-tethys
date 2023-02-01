import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyGuiderModule } from 'ngx-tethys/guider';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySliderModule } from 'ngx-tethys/slider';
import { ThySwitchModule } from 'ngx-tethys/switch';

export default {
    imports: [
        CommonModule,
        ThyGuiderModule,
        FormsModule,
        ThyIconModule,
        ThyFormModule,
        ThyButtonModule,
        ThyGridModule,
        ThySelectModule,
        ThySliderModule,
        ThySwitchModule
    ]
};

import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTimelineModule } from 'ngx-tethys/timeline';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyRadioModule } from 'ngx-tethys/radio';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [
        CommonModule,
        FormsModule,
        ThyButtonModule,
        ThyTimelineModule,
        ThyFormModule,
        ThyAvatarModule,
        ThyIconModule,
        ThySelectModule,
        ThyRadioModule
    ]
};

import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyStepperModule } from 'ngx-tethys/stepper';
import { ThyButtonModule } from 'ngx-tethys/button';

import { CommonModule } from '@angular/common';

export default {
    imports: [CommonModule, ThyStepperModule, ThyDialogModule, ThyButtonModule]
};

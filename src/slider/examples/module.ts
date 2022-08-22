import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThySliderModule } from 'ngx-tethys/slider';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThySliderModule, ThyLabelModule, ThyRadioModule, ThyInputModule]
};

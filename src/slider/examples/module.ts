import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThySliderModule } from 'ngx-tethys/slider';

export default {
    imports: [CommonModule, FormsModule, ThySliderModule, ThyRadioModule, ThyInputModule]
};

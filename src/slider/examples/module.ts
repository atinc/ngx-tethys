import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThySliderModule } from 'ngx-tethys/slider';

export default {
    imports: [CommonModule, FormsModule, ThySliderModule, ThyRadioModule, ThyInputModule, ThyInputNumberModule]
};

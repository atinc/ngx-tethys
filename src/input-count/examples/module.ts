import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyInputCountModule } from 'ngx-tethys/input-count';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThySpaceModule } from 'ngx-tethys/space';

export default {
    imports: [FormsModule, ThySpaceModule, CommonModule, ThySwitchModule, ThyInputCountModule]
};

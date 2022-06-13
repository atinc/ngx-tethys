import { ThyFormModule } from 'ngx-tethys/form';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyGuiderModule } from 'ngx-tethys/guider';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, ThyGuiderModule, FormsModule, ThyIconModule, ThyFormModule, ThyButtonModule, ThyGridModule]
};

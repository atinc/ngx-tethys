import { ThyActionModule } from 'ngx-tethys/action';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCopyModule } from 'ngx-tethys/copy';
import { ThyInputModule } from 'ngx-tethys/input';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyCopyModule, ThyButtonModule, ThyInputModule, ThyActionModule]
};

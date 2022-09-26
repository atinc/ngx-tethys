import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyTreeSelectModule, ThyButtonModule, ThyIconModule, ThySwitchModule],
    declarations: []
};

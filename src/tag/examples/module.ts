import { CommonModule } from '@angular/common';
import { ThyTagModule } from 'ngx-tethys/tag';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyGridModule } from 'ngx-tethys/grid';

export default {
    imports: [CommonModule, ThyButtonModule, ThyTagModule, ThyIconModule, ThyGridModule]
};

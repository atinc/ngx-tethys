import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionModule } from 'ngx-tethys/action';
import { CommonModule } from '@angular/common';

export default {
    imports: [CommonModule, ThyActionModule, ThyButtonModule, ThyIconModule, ThySpaceModule]
};

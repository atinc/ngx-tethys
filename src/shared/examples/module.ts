import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTagModule } from 'ngx-tethys/tag';
import { ThyViewOutletCounterComponent } from './view-outlet/view-outlet.component';

export default {
    declarations: [ThyViewOutletCounterComponent],
    imports: [CommonModule, ThySharedModule, ThyButtonModule, ThyIconModule, ThyTagModule]
};

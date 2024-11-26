import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySegmentModule } from 'ngx-tethys/segment';

export default {
    imports: [CommonModule, FormsModule, ThySegmentModule, ThyGridModule, ThyDividerModule]
};

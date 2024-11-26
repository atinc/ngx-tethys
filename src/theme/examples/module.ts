import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySegmentModule } from 'ngx-tethys/segment';

export default {
    imports: [CommonModule, FormsModule, ThySegmentModule, ThyGridModule]
};

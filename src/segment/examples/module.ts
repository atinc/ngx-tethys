import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThySegmentModule } from 'ngx-tethys/segment';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThySegmentModule, ThyButtonModule, ThyIconModule, ThyAvatarModule]
};

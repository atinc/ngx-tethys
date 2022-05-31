import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThySegmentedModule } from 'ngx-tethys/segmented';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThySegmentedModule, ThyButtonModule, ThyIconModule, ThyAvatarModule]
};

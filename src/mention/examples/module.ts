import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyMentionModule } from 'ngx-tethys/mention';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyAvatarModule, ThyMentionModule, ThyInputModule, ThyListModule]
};

import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyMentionModule } from 'ngx-tethys/mention';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from 'ngx-tethys/shared';

export default {
    imports: [CommonModule, FormsModule, ThyAvatarModule, ThyMentionModule, ThyInputModule, ThyListModule, ThySharedModule]
};

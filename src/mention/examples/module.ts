import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyMentionModule } from 'ngx-tethys/mention';
import { ThyInputModule } from 'ngx-tethys/input';

export default {
    imports: [CommonModule, FormsModule, ThyAvatarModule, ThyMentionModule, ThyInputModule]
};

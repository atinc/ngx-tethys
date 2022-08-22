import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTimelineModule } from 'ngx-tethys/timeline';
import { ThyButtonModule } from 'ngx-tethys/button';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyButtonModule, ThyTimelineModule, ThyFormModule, ThyAvatarModule, ThyIconModule]
};

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';

export default {
    imports: [CommonModule, FormsModule, ThyCheckboxModule, ThyButtonModule, ThyLoadingModule, ThyListModule, ThyNotifyModule]
};

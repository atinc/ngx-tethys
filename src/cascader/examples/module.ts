import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';

export default {
    imports: [CommonModule, FormsModule, ThySpaceModule, ThyButtonModule, ThyIconModule, ThyFlexibleTextModule, ThyCascaderModule]
};

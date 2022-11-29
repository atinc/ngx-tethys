import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyTypographyModule } from 'ngx-tethys/typography';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyDividerModule } from 'ngx-tethys/divider';

export default {
    imports: [CommonModule, FormsModule, ThyIconModule, ThyTypographyModule, ThySpaceModule, ThyFlexibleTextModule, ThyDividerModule]
};

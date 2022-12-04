import { CommonModule } from '@angular/common';
import { ThyHotkeyModule } from '@tethys/cdk/hotkey';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyAlertModule } from 'ngx-tethys/alert';
import { ThyCopyModule } from 'ngx-tethys/copy';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThySharedModule } from 'ngx-tethys/shared';

export default {
    imports: [
        CommonModule,
        ThyHotkeyModule,
        ThyInputModule,
        ThyButtonModule,
        ThyAlertModule,
        ThySharedModule,
        ThyActionModule,
        ThyCopyModule
    ]
};

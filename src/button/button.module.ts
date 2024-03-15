import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonGroup } from './button-group.component';
import { ThyButtonIcon } from './button-icon.component';
import { ThyButton } from './button.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyButton, ThyButtonIcon, ThyButtonGroup],
    exports: [ThyButton, ThyButtonIcon, ThyButtonGroup]
})
export class ThyButtonModule {}

import { NgModule } from '@angular/core';
import { ThyGuider } from './guider.service';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyGuiderTargetDirective } from './guider.directive';
import { ThyGuiderHintComponent } from './guider-hint/guider-hint.component';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyButtonModule, ThyPopoverModule],
    declarations: [ThyGuiderHintComponent, ThyGuiderTargetDirective],
    exports: [ThyGuiderHintComponent, ThyGuiderTargetDirective],
    providers: [ThyGuider]
})
export class ThyGuiderModule {}

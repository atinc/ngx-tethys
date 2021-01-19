import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { GuiderDrawHighlightService } from './guider-highlight-draw';
import { ThyGuider } from './guider.service';
import { ThyGuiderHintComponent } from './guider-hint/guider-hint.component';
import { GuiderDrawHintService } from './guider-hint-draw';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyPopoverModule } from 'ngx-tethys/popover';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyButtonModule, ThyPopoverModule],
    declarations: [ThyGuiderHintComponent],
    exports: [ThyGuiderHintComponent],
    entryComponents: [ThyGuiderHintComponent],
    providers: [ThyGuider, GuiderDrawHighlightService, GuiderDrawHintService]
})
export class ThyGuiderModule {}

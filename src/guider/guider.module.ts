import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { GuiderDrawHighlightService } from './guider-highlight-draw';
import { ThyGuider } from './guider.service';
import { ThyGuiderHintComponent } from './guider-hint/guider-hint.component';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule],
    declarations: [ThyGuiderHintComponent],
    exports: [ThyGuiderHintComponent],
    entryComponents: [ThyGuiderHintComponent],
    providers: [ThyGuider, GuiderDrawHighlightService]
})
export class ThyGuiderModule {}

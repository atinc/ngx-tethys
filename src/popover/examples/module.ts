import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyPopoverBasicExampleComponent } from './basic/basic.component';
import { ThyPopoverDirectiveExampleComponent } from './directive/directive.component';
import { ThyPopoverBasicContentComponent } from './basic/popover-content.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [ThyPopoverBasicContentComponent, ThyPopoverBasicExampleComponent, ThyPopoverDirectiveExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, NgxTethysModule, FormsModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyPopoverExamplesModule {}

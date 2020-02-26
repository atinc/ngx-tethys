import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared.module';
import { TooltipBasicDemoComponent } from './basic/tooltip-basic.component';
import { TooltipTemplateDemoComponent } from './template/tooltip-template.component';
import { TooltipTemplateDataDemoComponent } from './template-data/tooltip-template-data.component';
import { DemoTooltipSectionComponent } from './tooltip-section.component';

@NgModule({
    declarations: [
        DemoTooltipSectionComponent,
        TooltipBasicDemoComponent,
        TooltipTemplateDemoComponent,
        TooltipTemplateDataDemoComponent
    ],
    imports: [CommonModule, SharedModule],
    exports: [DemoTooltipSectionComponent],
    providers: [],
    entryComponents: [TooltipBasicDemoComponent, TooltipTemplateDemoComponent, TooltipTemplateDataDemoComponent]
})
export class DemoTooltipModule {}

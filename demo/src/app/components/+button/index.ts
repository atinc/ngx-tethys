import { NgModule } from '@angular/core';
import { DemoButtonSectionComponent } from './button-section.component';
import { SharedModule } from 'app/shared.module';
import { DemoButtonBasicComponent } from './basic/button-basic.component';
import { DemoButtonPairComponent } from './pair/button-pair.component';
import { DemoButtonIconComponent } from './icon/button-icon.component';
import { DemoButtonLinkComponent } from './link/button-link.component';
import { DemoButtonSizeComponent } from './size/button-size.component';
import { DemoButtonOutlineComponent } from './outline/button-outline.component';
import { DemoButtonSquareComponent } from './square/button-square.component';
import { DemoButtonLoadingComponent } from './loading/button-loading.component';
import { DemoButtonGroupComponent } from './group/button-group.component';

@NgModule({
    declarations: [
        DemoButtonSectionComponent,
        DemoButtonBasicComponent,
        DemoButtonPairComponent,
        DemoButtonIconComponent,
        DemoButtonLinkComponent,
        DemoButtonSizeComponent,
        DemoButtonOutlineComponent,
        DemoButtonSquareComponent,
        DemoButtonLoadingComponent,
        DemoButtonGroupComponent
    ],
    entryComponents: [
        DemoButtonBasicComponent,
        DemoButtonPairComponent,
        DemoButtonIconComponent,
        DemoButtonLinkComponent,
        DemoButtonSizeComponent,
        DemoButtonOutlineComponent,
        DemoButtonSquareComponent,
        DemoButtonLoadingComponent,
        DemoButtonGroupComponent
    ],
    imports: [SharedModule],
    exports: [DemoButtonSectionComponent]
})
export class DemoButtonModule {}

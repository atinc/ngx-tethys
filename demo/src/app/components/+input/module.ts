import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared.module';
import { DemoInputBasicComponent } from './demo/basic/basic.component';
import { InputSectionComponent } from './input-section.component';
import { DemoInputSizeComponent } from './demo/size/size.component';
import { DemoInputPasswordComponent } from './demo/password/password.component';
import { DemoInputSearchComponent } from './demo/search/search.component';
import { DemoInputLabelComponent } from './demo/label/label.component';
import { DemoInputPrependAppendComponent } from './demo/prepend-append/prepend-append.component';
import { DemoInputAppendComponent } from './demo/append/append.component';

const DemoComponents = [
    DemoInputBasicComponent,
    DemoInputSizeComponent,
    DemoInputPasswordComponent,
    DemoInputSearchComponent,
    DemoInputLabelComponent,
    DemoInputPrependAppendComponent,
    DemoInputAppendComponent
];

@NgModule({
    imports: [SharedModule],
    exports: [InputSectionComponent],
    declarations: [InputSectionComponent, ...DemoComponents],
    entryComponents: [...DemoComponents],
    providers: []
})
export class DemoInputModule {}

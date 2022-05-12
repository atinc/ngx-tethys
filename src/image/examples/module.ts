import { NgModule } from '@angular/core';
import { ThyImageModule } from 'ngx-tethys/image';
import { ThyImageBasicExampleComponent } from './basic/basic.component';

const COMPONENTS = [ThyImageBasicExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [ThyImageModule],
    exports: COMPONENTS
})
export class ImageExampleModule {}

import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyProgressModule } from 'ngx-tethys/progress';
import { ThyUploadModule } from 'ngx-tethys/upload';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyUploaderAcceptFolderExampleComponent } from './accept-folder/accept-folder.component';
import { ThyUploaderBasicExampleComponent } from './basic/basic.component';
import { ThyUploaderDropExampleComponent } from './drop/drop.component';
import { ThyUploaderSizeExceedsHandlerExampleComponent } from './size-exceeds-handler/size-exceeds-handler.component';

const COMPONENTS = [
    ThyUploaderBasicExampleComponent,
    ThyUploaderDropExampleComponent,
    ThyUploaderAcceptFolderExampleComponent,
    ThyUploaderSizeExceedsHandlerExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        ThyUploadModule,
        ThyProgressModule,
        ThyButtonModule,
        ThyFormModule,
        ThyInputModule,
        ThyCheckboxModule,
        CommonModule,
        FormsModule
    ],
    exports: [...COMPONENTS]
})
export class ThyUploaderExamplesModule {}

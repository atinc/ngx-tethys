import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyProgressModule } from 'ngx-tethys/progress';
import { ThyUploadModule } from 'ngx-tethys/upload';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyUploadAcceptFolderExampleComponent } from './accept-folder/accept-folder.component';
import { ThyUploadBasicExampleComponent } from './basic/basic.component';
import { ThyUploadDropExampleComponent } from './drop/drop.component';
import { ThyUploadSizeExceedsHandlerExampleComponent } from './size-exceeds-handler/size-exceeds-handler.component';

const COMPONENTS = [
    ThyUploadBasicExampleComponent,
    ThyUploadDropExampleComponent,
    ThyUploadAcceptFolderExampleComponent,
    ThyUploadSizeExceedsHandlerExampleComponent
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
export class ThyUploadExamplesModule {}

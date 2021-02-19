import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyUploaderModule } from 'ngx-tethys/uploader';
import { ThyProgressModule } from 'ngx-tethys/progress';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyUploaderBasicExampleComponent } from './basic/basic.component';
import { ThyUploaderMultipleExampleComponent } from './multiple/multiple.component';
import { ThyUploaderAcceptFolderExampleComponent } from './accept-folder/accept-folder.component';
import { ThyUploaderDropExampleComponent } from './drop/drop.component';

const COMPONENTS = [
    ThyUploaderBasicExampleComponent,
    ThyUploaderMultipleExampleComponent,
    ThyUploaderDropExampleComponent,
    ThyUploaderAcceptFolderExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [
        ThyUploaderModule,
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

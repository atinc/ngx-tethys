import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyUploaderModule, ThyProgressModule, ThyButtonModule } from 'ngx-tethys';
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
    imports: [ThyUploaderModule, ThyProgressModule, CommonModule, ThyButtonModule],
    exports: [...COMPONENTS]
})
export class ThyUploaderExamplesModule {}

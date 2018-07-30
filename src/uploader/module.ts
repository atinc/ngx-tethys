import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFileSelectComponent } from './file-select.component';
import { ThyFileDropComponent } from './file-drop.component';
import { ThyUploaderService } from './uploader';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    declarations: [
        ThyFileSelectComponent,
        ThyFileDropComponent,
    ],
    imports: [
        CommonModule,
        ThyDirectiveModule
    ],
    entryComponents: [
        ThyFileDropComponent,
    ],
    providers: [
        ThyUploaderService
    ],
    exports: [
        ThyFileSelectComponent,
        ThyFileDropComponent,
    ]
})
export class ThyUploaderModule {

}

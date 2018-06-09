import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFileSelectComponent } from './file-select.component';
import { ThyUploaderService } from './uploader';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    declarations: [
        ThyFileSelectComponent
    ],
    imports: [
        CommonModule,
        ThyDirectiveModule
    ],
    entryComponents: [
    ],
    providers: [
        ThyUploaderService
    ],
    exports: [
        ThyFileSelectComponent
    ]
})
export class ThyUploaderModule {

}

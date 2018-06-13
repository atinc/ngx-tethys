import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyEditorComponent } from './editor.component';
import { ThyEditorService } from './editor.service';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThySharedModule
    ],
    declarations: [
        ThyEditorComponent
    ],
    exports: [
        ThyEditorComponent
    ],
    providers: [
        ThyEditorService
    ]
})
export class ThyEditorModule {

}

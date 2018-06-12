import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyEditorComponent } from './editor.component';
import { ThyEditorService } from './editor.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
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

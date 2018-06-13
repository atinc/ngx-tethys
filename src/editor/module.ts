import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyEditorComponent } from './editor.component';
import { ThyEditorService } from './editor.service';
import { FormsModule } from '@angular/forms';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyDirectiveModule
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyEditorComponent } from './editor.component';
import { FormsModule } from '@angular/forms';
import { ThyUploaderModule } from '../uploader';
import { ThyEditorLinkModuleService, ThyDefaultEditorLinkModuleService } from './editor-linkmodule.service';
import { ThyMarkdownModule } from '../markdown';
@NgModule({
    imports: [CommonModule, FormsModule, ThyMarkdownModule, ThyUploaderModule],
    declarations: [ThyEditorComponent],
    exports: [ThyEditorComponent],
    providers: [
        {
            provide: ThyEditorLinkModuleService,
            useClass: ThyDefaultEditorLinkModuleService
        }
    ]
})
export class ThyEditorModule {}
